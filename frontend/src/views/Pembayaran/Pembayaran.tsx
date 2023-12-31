import React from 'react';
import Cards from 'components/Cards/Cards';
import Footer from 'layouts/containers/Public/Footer';
import Prabayar from 'components/Prabayar/Prabayar';
import Link from 'next/link';

export default function Pembayaran() {
  const DataPembayaran = [
    { bank: 'Credit/Debit Card', iconBank: ['./static/icons/bank/visa.png', './static/icons/bank/masterCard.png'], href: '/creditCard' },
    { bank: 'Bank Transfer', iconBank: ['./static/icons/bank/bca.png', './static/icons/bank/bca.png', './static/icons/bank/bca.png', './static/icons/bank/bca.png'], href: '/bankTransfer' },
    { bank: 'E-wallets', iconBank: ['./static/icons/bank/dana.png', './static/icons/bank/dana.png'], href: '/ewallet' },
  ];
  

  return (
    <div>
      <div className="w-[532px] h-[803px] bg-gray-100 m-auto my-8">
        <Prabayar />
        <div>
          <div className="h-[177px] bg-slate-300 p-14">
            <h1 className="text-[24px]">NusaKMS</h1>
          </div>
          <div className="h-[626px] mx-[18px] mt-[70px]">
            <h4>Pilih Metode Pembayaran</h4>
            <hr />
            {DataPembayaran.map((item, index) => (
              <Link key={index} href={item.href}>
                <div>
                  <Cards.CardPembayaran
                    bank={item.bank}
                    iconBank={item.iconBank}
                  />
                  {index < DataPembayaran.length - 1 && <hr />}
                </div>
              </Link>
            ))}
            <hr />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
