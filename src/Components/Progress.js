/** @format */

import React from "react";
import { Progress as Progressbar } from "antd";
import { ConfigProvider } from "antd";

const Progress = ({ percentage  }) => {
  return (
    <div className="fullscreen-progress-bar">
      <ConfigProvider
        theme={{
          components: {
            Progress: {
              circleTextColor: "#fff",
              remainingColor: "#F0F0F0",
              fontFamily: "OutfitRegular",
            },
          },
        }}
      >
        <Progressbar type="circle" percent={percentage || 0} />
      </ConfigProvider>
    </div>
  );
};

export default Progress;