package com.project.ArtRari.common;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {
    public static final String BIDS_QUEUE = "bids-queue";

    @Bean
    public Queue bidsQueue() {
        // true означает, что очередь переживет перезагрузку сервера RabbitMQ
        return new Queue(BIDS_QUEUE, true); 
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new JacksonJsonMessageConverter();
    }
}
