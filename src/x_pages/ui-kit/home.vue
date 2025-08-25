<script setup lang="ts">
// Image assets
const batteryIcon = 'http://localhost:3845/assets/a49b8f824a289e9d504519fb2dcaab45d3540511.svg'
const wifiIcon = 'http://localhost:3845/assets/72840d6c9d8aabd1ffaf6cf000552263f02ac320.svg'
const cellularIcon = 'http://localhost:3845/assets/cad418f4aa0ff9e6d3d17296b2962208cd22529e.svg'
const logoIcon = 'http://localhost:3845/assets/85f620aeb2e35978a4d48e90140dac18d1450263.svg'
const bellIcon = 'http://localhost:3845/assets/530ed8dcfc51914c5e8649c7eafe2a302ad75835.svg'
const notificationDot = 'http://localhost:3845/assets/dfa31e28a79d9d112201993b5915effa5f69eb77.svg'
const eyeIcon = 'http://localhost:3845/assets/7ee6123d7f6fae0b1ad8dfd96f3c7ece4b3cf40d.svg'
const arrowUpIcon = 'http://localhost:3845/assets/df2fff983ae60170eec7cfc1b43d4d8dbb6d6d0e.svg'
const depositIcon = 'http://localhost:3845/assets/83987ee9fc768c0186d16f155349b56a71dbd082.svg'
const withdrawIcon = 'http://localhost:3845/assets/8b8685d6540b0a2d6e03c6e917692e2fb7134b10.svg'
const transferIcon = 'http://localhost:3845/assets/ed2aec7286b172db7e47e11ea1fc4a70091327fe.svg'
const adobeBgIcon = 'http://localhost:3845/assets/874f3c36989a2b48bd604ba5712f7d079a61e095.svg'
const adobeIcon = 'http://localhost:3845/assets/28da48b3a237a372301e57048a11cb6c97022828.svg'
const adobeChart = 'http://localhost:3845/assets/e69b660f9697cea067eadfeb029646e3d47fe0da.svg'
const amazonBgIcon = 'http://localhost:3845/assets/7f1ce5ae48b1fd9676492c33bd5cd950c1e4dca0.svg'
const amazonIcon = 'http://localhost:3845/assets/4da4b0ffdc9ba819411fd6f02ac22132673751c9.svg'
const amazonChart = 'http://localhost:3845/assets/47df0325e7227d5a8fd2666152049fe9da7c6c7e.svg'
const plusCircleIcon = 'http://localhost:3845/assets/bbec931d556a242eb1e14833e4aaf8303ce4f984.svg'
const amznWishlistChart = 'http://localhost:3845/assets/76fba3615c02ae7185ba875e78c2ae7e5afe9591.svg'
const microsoftIcon = 'http://localhost:3845/assets/e70505ee843859a112608f0d34d284a6f973c9fd.svg'
const msftChart = 'http://localhost:3845/assets/4cd50f777506761a7e0010c0c9759c634cfde4dd.svg'
const amdIcon = 'http://localhost:3845/assets/14f9a2d7fa4b918df86742fc61a24d5e4d955247.png'
const amdChart = 'http://localhost:3845/assets/838ced33562566e7e17521f87f9608ec7d443813.svg'
const absciIcon = 'http://localhost:3845/assets/6986c51765898d05270ac9ab9a70978bafd230a9.png'
const absciChart = 'http://localhost:3845/assets/1c6258d70eedd61f1f89d587157f0cf93d878568.svg'
const homeBgIcon = 'http://localhost:3845/assets/63637d811967e347ffa618c33f14e4b72ef87055.svg'
const homeFilledIcon = 'http://localhost:3845/assets/805978c742a9a67b1391bb163b4e3f53ebc798cb.svg'
const homeDotIcon = 'http://localhost:3845/assets/2d14ea1fd9bfab3c75d1b98d69eaf4947e7e997c.svg'
const dataIcon1 = 'http://localhost:3845/assets/35a7673ebe4ce5e2a95873b9471f683ba64038fd.svg'
const dataIcon2 = 'http://localhost:3845/assets/24d55f89733936b8f7559fd164a52bbc111ecbdc.svg'
const swapIcon = 'http://localhost:3845/assets/9b6bb73e097ac4578a3438d57a4d6cdec285b095.svg'
const trendingIcon = 'http://localhost:3845/assets/aeeec8943ff4c886a6f61b1dddb2bf6fee660c82.svg'
const userIcon = 'http://localhost:3845/assets/35584ad775730393a877c5795de302343fb29ace.svg'
</script>

<template>
  <div class="home-container bg-[#5955ff] relative w-full h-full max-w-[375px] mx-auto">
    <!-- Top Status Bar -->
    <div class="status-bar absolute h-11 left-0 top-0 w-[375px]">
      <div class="absolute h-[21px] left-3 top-[13px] w-[54px]">
        <div class="font-['SF_Pro_Text'] font-semibold text-[14px] text-white text-center leading-normal tracking-[-0.28px] absolute left-[27px] translate-x-[-50%]" style="top: calc(50% - 7.5px)">
          9:41
        </div>
      </div>
      <div class="absolute h-[11.333px] right-[21.34px] top-[17.33px] w-[24.328px]">
        <img alt="battery" class="block max-w-none w-full h-full" :src="batteryIcon">
      </div>
      <div class="absolute right-[50.72px] top-[17.75px] w-[15.33px] h-[11px]">
        <img alt="wifi" class="block max-w-none w-full h-full" :src="wifiIcon">
      </div>
      <div class="absolute right-[70.84px] top-[17.67px] w-[17px] h-[10.67px]">
        <img alt="cellular" class="block max-w-none w-full h-full" :src="cellularIcon">
      </div>
    </div>

    <!-- Header Section -->
    <div class="header absolute h-[239px] left-0 rounded-bl-[6px] rounded-br-[6px] top-0 w-[375px]">
      <!-- Header Content -->
      <div class="header-content absolute flex items-center justify-between left-0 px-4 py-3 top-11 w-[375px]">
        <div class="logo-section flex gap-2 items-center">
          <div class="w-5 h-5 flex items-center justify-center">
            <img alt="logo" class="block max-w-none w-full h-full" :src="logoIcon">
          </div>
          <div class="font-['Inter_Tight'] font-semibold text-[#ffffff] text-[20px] leading-[1.4]">
            Stockup
          </div>
        </div>
        <div class="notification-section relative w-5 h-[22px]">
          <div class="absolute left-0 w-5 h-5 top-0.5 overflow-clip">
            <img alt="bell" class="block max-w-none w-full h-full" :src="bellIcon">
          </div>
          <div class="absolute left-[11px] w-2 h-2 top-0">
            <img alt="notification dot" class="block max-w-none w-full h-full" :src="notificationDot">
          </div>
        </div>
      </div>

      <!-- Portfolio Card -->
      <div class="portfolio-card absolute bg-[#ffffff] h-[159px] left-1/2 rounded-xl top-[114px] translate-x-[-50%] w-[343px] border border-[#eaeaea]">
        <div class="h-[159px] overflow-clip relative w-[343px]">
          <!-- Portfolio Header -->
          <div class="absolute flex gap-3 items-end left-4 top-4">
            <div class="flex flex-col gap-1 items-start leading-[0] not-italic text-nowrap">
              <div class="font-['Inter_Tight'] font-normal text-[#a4acb9] text-[14px] leading-[1.5]">
                Portfolio value
              </div>
              <div class="font-['Inter_Tight'] font-semibold text-[#0d0d12] text-[24px] leading-[1.4] tracking-[-0.3px]">
                $13,240.11
              </div>
            </div>
            <div class="w-4 h-4 overflow-clip relative shrink-0">
              <img alt="eye" class="block max-w-none w-full h-full" :src="eyeIcon">
            </div>
          </div>

          <!-- Today Stats -->
          <div class="absolute flex gap-1.5 items-center right-4 top-[57px]">
            <div class="font-['Inter_Tight'] font-medium text-[#272835] text-[12px] leading-[1.5]">
              Today
            </div>
            <div class="flex gap-1 items-center rounded-lg">
              <div class="font-['Inter_Tight'] font-semibold text-[12px] text-green-600 leading-none">
                + 1.74%
              </div>
              <div class="w-4 h-4 relative shrink-0">
                <img alt="arrow up" class="block max-w-none w-full h-full" :src="arrowUpIcon">
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="absolute flex gap-16 items-start left-1/2 top-[91px] translate-x-[-50%]">
            <div class="flex flex-col gap-0.5 items-center">
              <div class="w-8 h-8 relative">
                <div class="absolute bg-[#f6f8fa] left-1/2 rounded-full w-8 h-8 top-1/2 translate-x-[-50%] translate-y-[-50%] border-[0.8px] border-[#eceff3] shadow-[0px_4.8px_10.4px_0px_rgba(160,174,192,0.04)]" />
                <div class="absolute w-4 h-4 top-1/2 translate-x-[-50%] translate-y-[-50%] overflow-clip left-[calc(50%_+_0.5px)]">
                  <img alt="deposit" class="block max-w-none w-full h-full" :src="depositIcon">
                </div>
              </div>
              <div class="font-['Inter_Tight'] font-normal text-[#666d80] text-[12px] leading-[1.5]">
                Deposit
              </div>
            </div>
            <div class="flex flex-col gap-0.5 items-center">
              <div class="w-8 h-8 relative">
                <div class="absolute bg-[#f6f8fa] left-1/2 rounded-full w-8 h-8 top-1/2 translate-x-[-50%] translate-y-[-50%] border-[0.8px] border-[#eceff3] shadow-[0px_4.8px_10.4px_0px_rgba(160,174,192,0.04)]" />
                <div class="absolute left-1/2 w-4 h-4 top-1/2 translate-x-[-50%] translate-y-[-50%] overflow-clip">
                  <img alt="withdraw" class="block max-w-none w-full h-full" :src="withdrawIcon">
                </div>
              </div>
              <div class="font-['Inter_Tight'] font-normal text-[#666d80] text-[12px] leading-[1.5]">
                Withdraw
              </div>
            </div>
            <div class="flex flex-col gap-0.5 items-center">
              <div class="w-8 h-8 relative">
                <div class="absolute bg-[#f6f8fa] left-1/2 rounded-full w-8 h-8 top-1/2 translate-x-[-50%] translate-y-[-50%] border-[0.8px] border-[#eceff3] shadow-[0px_4.8px_10.4px_0px_rgba(160,174,192,0.04)]" />
                <div class="absolute left-1/2 w-4 h-4 top-1/2 translate-x-[-50%] translate-y-[-50%] overflow-clip">
                  <img alt="transfer" class="block max-w-none w-full h-full" :src="transferIcon">
                </div>
              </div>
              <div class="font-['Inter_Tight'] font-normal text-[#666d80] text-[12px] leading-[1.5]">
                Transfer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content absolute bg-[#ffffff] bottom-[83px] h-[529px] left-0 overflow-clip w-[375px]">
      <!-- Trending Header -->
      <div class="trending-header absolute flex gap-[222px] items-center left-1/2 top-8 translate-x-[-50%]">
        <div class="font-['SF_Pro_Display'] font-semibold text-[#2d3748] text-[18px] leading-none tracking-[-0.18px]">
          Trending
        </div>
        <div class="flex gap-1 items-start">
          <div class="bg-[#5955ff] h-1.5 rounded-md w-5" />
          <div class="bg-[#edf2f7] h-1.5 rounded-md w-3" />
          <div class="bg-[#edf2f7] h-1.5 rounded-md w-3" />
        </div>
      </div>

      <!-- Stock Cards -->
      <div class="stock-cards absolute flex gap-4 items-start left-4 top-[97px]">
        <!-- Adobe Card -->
        <div class="stock-card bg-[#ffffff] h-[136px] relative rounded-md w-[212px] border border-[#eceff3]">
          <div class="h-[136px] overflow-clip relative w-[212px]">
            <div class="absolute flex gap-3 items-center left-3 top-3 w-28">
              <div class="bg-neutral-50 overflow-clip relative rounded-full shrink-0 w-10 h-10">
                <div class="absolute left-1/2 overflow-clip w-8 h-8 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                  <div class="absolute inset-[6.25%]">
                    <img alt="adobe bg" class="block max-w-none w-full h-full" :src="adobeBgIcon">
                  </div>
                  <div class="absolute bottom-[28.13%] left-[21.88%] right-[21.88%] top-1/4">
                    <img alt="adobe" class="block max-w-none w-full h-full" :src="adobeIcon">
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-1 items-start justify-center leading-[0] not-italic text-nowrap">
                <div class="font-['Inter_Tight'] font-bold text-[#0d0d12] text-[14px] leading-[1.4]">
                  ADBE
                </div>
                <div class="font-['Inter_Tight'] font-normal text-[#666d80] text-[10px] tracking-[0.2px] leading-none">
                  Adobe, Inc
                </div>
              </div>
            </div>
            <div class="absolute flex flex-col gap-1 items-start justify-center left-3 top-[76px]">
              <div class="font-['Inter_Tight'] font-semibold text-[#0d0d12] text-[14px] leading-none">
                $88.91
              </div>
              <div class="flex gap-1 items-center">
                <div class="font-['Inter_Tight'] font-semibold text-[12px] text-green-600 leading-none">
                  + 0.32%
                </div>
              </div>
            </div>
            <div class="absolute h-[63px] right-0 top-[76px] w-[115px]">
              <div class="absolute bottom-0 left-0 right-[-0.55%] top-[-1.24%]">
                <img alt="adobe chart" class="block max-w-none w-full h-full" :src="adobeChart">
              </div>
            </div>
          </div>
        </div>

        <!-- Amazon Card -->
        <div class="stock-card bg-[#ffffff] h-[136px] relative rounded-md w-[212px] border border-[#eceff3]">
          <div class="h-[136px] overflow-clip relative w-[212px]">
            <div class="absolute flex gap-3 items-center left-3 top-3 w-28">
              <div class="bg-[#f6f8fa] overflow-clip relative rounded-full shrink-0 w-10 h-10">
                <div class="absolute inset-[6.25%]">
                  <img alt="amazon bg" class="block max-w-none w-full h-full" :src="amazonBgIcon">
                </div>
                <div class="absolute bottom-1/4 left-[21.88%] right-[21.88%] top-1/4">
                  <img alt="amazon" class="block max-w-none w-full h-full" :src="amazonIcon">
                </div>
              </div>
              <div class="flex flex-col gap-1 items-start leading-[0] not-italic text-nowrap">
                <div class="font-['Inter_Tight'] font-bold text-[#0d0d12] text-[14px] leading-[1.4]">
                  AMZN
                </div>
                <div class="font-['Inter_Tight'] font-normal text-[#666d80] text-[10px] tracking-[0.2px] leading-none">
                  Amazon, Inc
                </div>
              </div>
            </div>
            <div class="absolute flex flex-col gap-1 items-start justify-center left-3 top-[76px]">
              <div class="font-['Inter_Tight'] font-semibold text-[#0d0d12] text-[14px] leading-none">
                $3,283.26
              </div>
              <div class="flex gap-1 items-center">
                <div class="font-['Inter_Tight'] font-semibold text-[12px] text-red-500 leading-none">
                  - 0.05%
                </div>
              </div>
            </div>
            <div class="absolute h-[65px] right-0 top-[76px] w-[115px]">
              <div class="absolute bottom-0 left-[-2.14%] right-[-2.54%] top-[-5.95%]">
                <img alt="amazon chart" class="block max-w-none w-full h-full" :src="amazonChart">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wishlist Section -->
      <div class="wishlist-section absolute flex flex-col gap-4 items-start left-4 top-[265px]">
        <div class="wishlist-header flex items-center justify-between w-[343px]">
          <div class="font-['Inter_Tight'] font-semibold text-[#0d0d12] text-[18px] leading-none">
            Wishlist
          </div>
          <div class="w-5 h-5 overflow-clip relative">
            <img alt="plus circle" class="block max-w-none w-full h-full" :src="plusCircleIcon">
          </div>
        </div>

        <div class="wishlist-items flex flex-col gap-6 w-[343px]">
          <!-- AMZN -->
          <div class="wishlist-item flex items-center justify-between w-full">
            <div class="stock-details flex gap-3 items-center w-[126px]">
              <div class="bg-[#f6f8fa] overflow-clip relative rounded-full shrink-0 w-10 h-10">
                <div class="absolute inset-[6.25%]">
                  <img alt="amazon bg" class="block max-w-none w-full h-full" :src="amazonBgIcon">
                </div>
                <div class="absolute bottom-1/4 left-[21.88%] right-[21.88%] top-1/4">
                  <img alt="amazon" class="block max-w-none w-full h-full" :src="amazonIcon">
                </div>
              </div>
              <div class="flex flex-col gap-1 items-start leading-[0] not-italic text-nowrap w-10">
                <div class="font-['Inter_Tight'] font-bold text-[#0d0d12] text-[14px] leading-[1.4]">
                  AMZN
                </div>
                <div class="font-['Inter_Tight'] font-normal text-[#666d80] text-[10px] tracking-[0.2px] leading-none">
                  Amazon, Inc
                </div>
              </div>
            </div>
            <div class="h-[13px] w-[102px] relative">
              <img alt="amzn chart" class="block max-w-none w-full h-full" :src="amznWishlistChart">
            </div>
            <div class="stock-price-info flex flex-col gap-1 items-end justify-center">
              <div class="font-['Inter_Tight'] font-bold text-[#0d0d12] text-[14px] text-right leading-[1.4]">
                $3,283.26
              </div>
              <div class="flex gap-1 items-center justify-end w-full">
                <div class="font-['Inter_Tight'] font-semibold text-[12px] text-red-500 leading-none">
                  - 0.05%
                </div>
              </div>
            </div>
          </div>

          <!-- MSFT -->
          <div class="wishlist-item flex items-center justify-between w-full">
            <div class="stock-details flex gap-3 items-center">
              <div class="bg-[#f6f8fa] overflow-clip relative rounded-full shrink-0 w-10 h-10">
                <div class="absolute left-[11px] w-[18px] h-[18px] top-[11px]">
                  <img alt="microsoft" class="block max-w-none w-full h-full" :src="microsoftIcon">
                </div>
              </div>
              <div class="flex flex-col gap-1 items-start leading-[0] not-italic w-[75px]">
                <div class="font-['Inter_Tight'] font-bold text-[#0d0d12] text-[14px] min-w-full leading-[1.4]" style="width: min-content">
                  MSFT
                </div>
                <div class="font-['Inter_Tight'] font-normal text-[#666d80] text-[10px] text-nowrap tracking-[0.2px] leading-none">
                  Microsoft, Corp
                </div>
              </div>
            </div>
            <div class="h-[19px] w-[89px] relative">
              <img alt="msft chart" class="block max-w-none w-full h-full" :src="msftChart">
            </div>
            <div class="stock-price-info flex flex-col gap-1 items-end justify-center w-[60px]">
              <div class="font-['Inter_Tight'] font-bold text-[#0d0d12] text-[14px] text-right w-full leading-[1.4]">
                $188.09
              </div>
              <div class="flex gap-1 items-center justify-end w-full">
                <div class="font-['Inter_Tight'] font-semibold text-[12px] text-green-600 text-nowrap leading-none">
                  + 2.29%
                </div>
              </div>
            </div>
          </div>

          <!-- AMD -->
          <div class="wishlist-item flex items-center justify-between w-full">
            <div class="stock-details flex gap-3 items-center w-[126px]">
              <div class="bg-[#f6f8fa] overflow-clip relative rounded-[50px] shrink-0 w-10 h-10">
                <div class="absolute bg-center bg-contain bg-no-repeat left-2.5 w-5 h-5 top-2.5" :style="{ backgroundImage: `url('${amdIcon}')` }" />
              </div>
              <div class="flex flex-col gap-1 items-start leading-[0] not-italic">
                <div class="font-['Inter_Tight'] font-bold text-[#0d0d12] text-[14px] w-10 leading-[1.4]">
                  AMD
                </div>
                <div class="font-['Inter_Tight'] font-normal text-[#666d80] text-[10px] text-nowrap tracking-[0.2px] leading-none">
                  Advance Micr...
                </div>
              </div>
            </div>
            <div class="h-[19px] w-[89px] relative">
              <img alt="amd chart" class="block max-w-none w-full h-full" :src="amdChart">
            </div>
            <div class="stock-price-info flex flex-col gap-1 items-end justify-center w-[60px]">
              <div class="font-['Inter_Tight'] font-bold text-[#0d0d12] text-[14px] text-right w-full leading-[1.4]">
                $100.41
              </div>
              <div class="flex gap-1 items-center justify-end w-full">
                <div class="font-['Inter_Tight'] font-semibold text-[12px] text-green-600 text-nowrap leading-none">
                  + 1.99%
                </div>
              </div>
            </div>
          </div>

          <!-- ABSCI -->
          <div class="wishlist-item flex items-center justify-between w-full">
            <div class="stock-details flex gap-3 items-center w-[126px]">
              <div class="bg-[#f6f8fa] overflow-clip relative rounded-full shrink-0 w-10 h-10">
                <div class="absolute bg-center bg-contain bg-no-repeat left-[7px] rounded-[50px] w-[26px] h-[26px] top-[7px]" :style="{ backgroundImage: `url('${absciIcon}')` }" />
              </div>
              <div class="flex flex-col gap-1 items-start leading-[0] not-italic">
                <div class="font-['Inter_Tight'] font-bold text-[#0d0d12] text-[14px] min-w-full leading-[1.4]" style="width: min-content">
                  ABSCI
                </div>
                <div class="font-['Inter_Tight'] font-normal text-[#666d80] text-[10px] text-nowrap tracking-[0.2px] leading-none">
                  ABSCI Corp
                </div>
              </div>
            </div>
            <div class="h-[13px] w-[102px] relative">
              <img alt="absci chart" class="block max-w-none w-full h-full" :src="absciChart">
            </div>
            <div class="stock-price-info flex flex-col gap-1 items-end justify-center w-[60px]">
              <div class="font-['Inter_Tight'] font-bold text-[#0d0d12] text-[14px] text-nowrap text-right leading-[1.4]">
                $11.82
              </div>
              <div class="flex gap-1 items-center justify-end">
                <div class="font-['Inter_Tight'] font-semibold text-[12px] text-nowrap text-red-500 leading-none">
                  - 4.83%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="bottom-nav absolute bg-[#ffffff] flex flex-col items-start pb-0 pt-1 px-0 left-0 top-[725px] w-[375px]">
      <div class="nav-items flex h-[49px] items-center justify-between px-[34px] py-0 w-[375px]">
        <div class="w-6 h-6 overflow-clip relative">
          <div class="absolute inset-0">
            <img alt="home bg" class="block max-w-none w-full h-full" :src="homeBgIcon">
          </div>
          <div class="absolute inset-[16.67%_16.54%_16.6%_16.79%]">
            <img alt="home filled" class="block max-w-none w-full h-full" :src="homeFilledIcon">
          </div>
          <div class="absolute inset-[62.5%_33.33%_33.33%_33.33%]">
            <img alt="home dot" class="block max-w-none w-full h-full" :src="homeDotIcon">
          </div>
        </div>
        <div class="w-6 h-6 overflow-clip relative">
          <div class="absolute inset-0">
            <img alt="data bg" class="block max-w-none w-full h-full" :src="homeBgIcon">
          </div>
          <div class="absolute inset-[13.31%_13.33%_12.64%_12.64%]">
            <img alt="data icon 1" class="block max-w-none w-full h-full" :src="dataIcon1">
          </div>
          <div class="absolute inset-[14.58%_14.58%_62.5%_62.5%]">
            <img alt="data icon 2" class="block max-w-none w-full h-full" :src="dataIcon2">
          </div>
        </div>
        <div class="bg-[#5955ff] overflow-clip relative rounded-full w-10 h-10">
          <div class="absolute flex inset-1/4 items-center justify-center">
            <div class="flex-none rotate-[90deg] w-5 h-5">
              <div class="relative w-full h-full">
                <div class="absolute inset-[15.97%_12.85%_15.98%_11.81%]">
                  <img alt="swap" class="block max-w-none w-full h-full" :src="swapIcon">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-6 h-6 overflow-clip relative">
          <div class="absolute h-[12.998px] translate-x-[-50%] translate-y-[-50%] w-[20px]" style="top: calc(50% - 0.001px); left: calc(50% - 0.001px)">
            <img alt="trending" class="block max-w-none w-full h-full" :src="trendingIcon">
          </div>
        </div>
        <div class="w-6 h-6 relative">
          <img alt="user" class="block max-w-none w-full h-full" :src="userIcon">
        </div>
      </div>
      <div class="home-indicator h-[34px] relative w-[375px]">
        <div class="absolute bg-[#0d0d12] bottom-[9px] h-[5px] rounded-full translate-x-[-50%] w-[134px]" style="left: calc(50% + 0.5px)" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=SF+Pro+Text:wght@400;500;600;700&display=swap');

.home-container {
  font-family: 'Inter Tight', sans-serif;
  overflow: hidden;
}

// Ensure proper sizing
.status-bar {
  z-index: 20;
}

.header {
  z-index: 15;
}

.portfolio-card {
  z-index: 10;
}

.content {
  z-index: 5;
}

.bottom-nav {
  z-index: 10;
}

// Responsive adjustments
@media (max-width: 375px) {
  .home-container {
    width: 100vw;
  }
}

// Text rendering improvements
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// Improve image rendering
img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}
</style>
