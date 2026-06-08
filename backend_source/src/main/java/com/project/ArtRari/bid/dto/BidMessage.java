package com.project.ArtRari.bid.dto;

import java.math.BigDecimal;

// Легкий объект, который переносит суть ставки от контроллера к воркеру
public record BidMessage(
        Long lotId,
        BigDecimal amount,
        Long userId
) {}
