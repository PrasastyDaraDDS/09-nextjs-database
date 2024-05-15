import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { Lusitana } from '@/app/components/atoms/fonts';
import { fetchLatestInvoices } from '../model/query';

export default async function LatestInvoices() {
    const latestInvoices = await fetchLatestInvoices();
    return (
        <div className="flex w-full flex-col md:col-span-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Latest Invoices
            </h2>
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                <div className="bg-white px-6">
                    {latestInvoices.map((invoice, i) => {
                        return (
                            <div
                                key={invoice.id}
                                className={clsx(
                                    'flex flex-row items-center justify-between py-4',
                                    {
                                        'border-t': i !== 0,
                                    },
                                )}
                            >
                                <div className="flex items-center">
                                    <Image
                                        src={invoice.image_url}
                                        alt={`${invoice.name}'s profile picture`}
                                        className="mr-4 rounded-full"
                                        width={32}
                                        height={32}
                                    />
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold md:text-base">
                                            {invoice.name}
                                        </p>
                                        <p className="hidden text-sm text-gray-500 sm:block">
                                            {invoice.email}
                                        </p>
                                    </div>
                                </div>
                                <p
                                    className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                                >
                                    {invoice.amount}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="flex items-center pb-2 pt-6">
                    <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                    <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
                </div>
            </div>
        </div>
    );
}

// Import libraries and components
import React from 'react';
import sql from 'some-sql-library';  // Pastikan library SQL yang Anda gunakan di-import dengan benar

// Kode fetching data
const fetchLatestInvoices = async () => {
  const data = await sql<LatestInvoiceRaw>`
    SELECT invoices.amount, customers.name, customers.image_url, customers.email
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC
    LIMIT 5`;

  return data;
};

// Komponen untuk menampilkan invoice terbaru
const LatestInvoices = () => {
  const [invoices, setInvoices] = React.useState([]);

  React.useEffect(() => {
    fetchLatestInvoices().then(setInvoices);
  }, []);

  return (
    <div>
      <h2>Latest Invoices</h2>
      <ul>
        {invoices.map((invoice, index) => (
          <li key={index} className="flex items-center space-x-4">
            <img
              src={invoice.image_url || 'images/img20.jpg'}
              alt={invoice.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p>{invoice.name}</p>
              <p>{invoice.email}</p>
              <p>{invoice.amount}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestInvoices;
