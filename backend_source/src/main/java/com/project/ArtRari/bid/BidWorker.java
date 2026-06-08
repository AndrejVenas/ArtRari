package com.project.ArtRari.bid;

import com.project.ArtRari.bid.dto.BidMessage;
import com.project.ArtRari.common.RabbitConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class BidWorker {
    private final BidService bidService;

    // Этот метод автоматически дергается RabbitMQ, как только в очереди появляется сообщение
    @RabbitListener(queues = RabbitConfig.BIDS_QUEUE)
    public void processBid(BidMessage bidMessage) {
        try {
            log.info("Processing bid for lot {} from user {}", bidMessage.lotId(), bidMessage.userId());

            // Вызываем наш старый добрый метод с пессимистичной блокировкой
            bidService.processBidSync(bidMessage.lotId(), bidMessage.amount(), bidMessage.userId());

        } catch (Exception e) {
            // Если ставка не прошла (например, цена оказалась ниже текущей из-за конкуренции),
            // мы перехватываем ошибку здесь, чтобы воркер не упал и взял следующую ставку
            log.error("Failed to process bid: {}", e.getMessage());

            // В идеале здесь можно добавить отправку приватного WebSocket-сообщения
            // конкретному пользователю (bidMessage.userId()), что его ставка отклонена.
        }
    }
}