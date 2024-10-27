import React from "react";
import ThemeProvider from './theme';
import RtlLayout from './helper/RtlLayout';
import MotionLazyContainer from './helper/animate/MotionLazyContainer';
import NotistackProvider from './helper/NotistackProvider';
import MyRouter from "./routes";
import { ProgressBarStyle } from "./helper/ProgressBar";
import { ChartStyle } from "./helper/chart";
import ScrollToTop from "./helper/ScrollToTop";
import ThemeColorPresets from './helper/ThemeColorPresets';

function App() {
  return (
    <ThemeProvider>
      <ThemeColorPresets>
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
          </ThemeColorPresets>
    </ThemeProvider>
 
    );
}

export default App;
