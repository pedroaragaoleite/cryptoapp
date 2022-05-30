import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Host': process.env.REACT_APP_COIN_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
}

const baseUrl = process.env.REACT_APP_API_COIN_URL;

const createRequest = (url) => ({ url, headers: cryptoApiHeaders});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (uuid) => createRequest(`/coin/${uuid}`),
        }),
        getCryptoHistory: builder.query({
            query: ({uuid, timePeriod}) => createRequest(`/coin/${uuid}/history?timePeriod=${timePeriod}`),
        }),
        getExchanges: builder.query({
            query: () => createRequest(`/exchanges`)
        })
    })
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangesQuery } = cryptoApi;

