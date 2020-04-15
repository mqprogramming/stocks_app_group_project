# Portfolio Tracker

- [About](#11-about)
- [Features](#12-features)
- [Getting Started](#13-getting-started)
  - [Install server dependencies](#131-install-server-dependencies)
  - [Client](#132-client)

![Wall street sign, Photo by Sophie Backes on Unsplash](./images/wall_st.jpeg)

## About

Portfolio tracker is a full stack JavaScript application with an Express server and MongoDB database.

This app lets you buy stock from the New York Stock Exchange, it looks up the latest prices and lets you enter the number of stocks you want to buy.  The app then shows you how your stocks are doing.  When you are ready you can then sell the share from your portfolio.

## Features

- Enter the NYSE ticker and get the latest price (within 5 minutes)
- Add shares from the New York Stock Exchange
- Sell shares
- Calulate the current value of the shares
- View your shares performance over time in a chart
- Display information on the shares you have bought
  - The shares ticker
  - The price they were bought at
  - the quantity bought
  - the date and time(within 5 minutes) of when they were bought

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.
Server

### Install server dependencies

```zsh
cd server
npm install
Seed the database:
npm run seeds
Run express:
npm run server:dev
```

### Client

```zsh
cd ../client
npm install
num run serve
```
