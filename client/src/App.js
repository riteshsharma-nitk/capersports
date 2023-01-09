import React, { useEffect, useState } from "react";
import ThemeProvider from './theme';
import RtlLayout from './helper/RtlLayout';
import MotionLazyContainer from './helper/animate/MotionLazyContainer';
import NotistackProvider from './helper/NotistackProvider';
import ThemeLocalization from './helper/ThemeLocalization';
import MyRouter from "./routes";
import { ProgressBarStyle } from "./helper/ProgressBar";
import { ChartStyle } from "./helper/chart";
import ScrollToTop from "./helper/ScrollToTop";

function App() {
  return (
    <ThemeProvider>
          <RtlLayout>
            <NotistackProvider>
              <MotionLazyContainer>
                <ProgressBarStyle/>
                <ChartStyle/>
                <ScrollToTop/>
                <MyRouter/>
              </MotionLazyContainer>
            </NotistackProvider>
          </RtlLayout>
    </ThemeProvider>
 
    );
}

export default App;
