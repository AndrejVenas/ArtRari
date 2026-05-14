import React from 'react'

const AuctionBid = () => {
  return (
        <div className="auction-bid">
            <label className="checkbox">
                <input type="checkbox" />
                    Я прочитав правила використання та згоден з
                    обробкою персональних даних
            </label>

            <a href="#" className="text-link auction-link">
                Правила використання
            </a>

            <div className="bid-controls">
                <input type="text" defaultValue="100$" />
                <button>Зробити ставку</button>
            </div>

            <p className="note">
                ціна з урахуванням комісії 110$
                </p>
            </div>
  )
}

export default AuctionBid