package com.project.ArtRari.auction;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuctionStateScheduler {
    private final AuctionService auctionService;

    @Scheduled(fixedRate = 60000)
    @SchedulerLock(name = "AuctionStateScheduler_openAuctions", lockAtLeastFor = "30s", lockAtMostFor = "2m")
    public void openAuctions() {
        auctionService.openAuctions();
    }

    @Scheduled(fixedRate = 10000)
    @SchedulerLock(name = "AuctionStateScheduler_closeAuctions", lockAtLeastFor = "5s", lockAtMostFor = "30s")
    public void closeAuctions() {
        auctionService.closeAuctions();
    }

}
