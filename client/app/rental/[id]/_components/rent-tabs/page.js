// rent-tabs

'use client';

import { useState } from "react";

export default function RentTabs() {
  const [activeTab, setActiveTab] = useState("rental");

  return (
    <div className="mt-3">
      <div className="d-flex">
        <button
          className={`btn btn-primary btn-radius me-1 ${activeTab === "rental" ? "active" : ""}`}
          onClick={() => setActiveTab("rental")}
        >
          租借內容
        </button>
        <button
          className={`btn btn-primary btn-radius ${activeTab === "spec" ? "active" : ""}`}
          onClick={() => setActiveTab("spec")}
        >
          產品規格
        </button>
      </div>

      <div id="tabContent">
        {activeTab === "rental" ? (
          <div className="card card-radius">
            <div className="card-body">
              <h5 className="card-title fee-text">商品配件</h5>
              <p>
                ．64G SD 記憶卡<br/>
                ．電池 x2<br/>
                ．充電器<br/>
                ．鏡頭蓋
              </p>
              <div className="mt-3">
                <h5 className="card-title fee-text">租借時段</h5>
                <div className="m-2">
                  <label htmlFor="startDate">開始日期</label>
                  <input type="date" id="startDate" className="form-control mb-2" />
                  <label htmlFor="endDate">結束日期</label>
                  <input type="date" id="endDate" className="form-control" />
                  <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-primary">立即租借</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card card-radius p-3">
            <table className="table">
              <tbody>
                <tr>
                  <th className="ps-3">尺寸</th>
                  <td>130 x 80 x 92 mm</td>
                </tr>
                <tr>
                  <th className="ps-3">重量</th>
                  <td>743 g</td>
                </tr>
                <tr>
                  <th className="ps-3">相機類型</th>
                  <td>背照式 CMOS 全幅相機</td>
                </tr>
                <tr>
                  <th className="ps-3">適配鏡頭</th>
                  <td>Summilux 28mm f/1.7 ASPH. (固定鏡頭)</td>
                </tr>
                <tr>
                  <th className="ps-3">鏡頭類型</th>
                  <td>廣角定焦鏡頭</td>
                </tr>
                <tr>
                  <th className="ps-3">產品特點</th>
                  <td>
                    ．6000萬像素<br/>
                    ．內建 28mm f/1.7 大光圈鏡頭<br/>
                    ．低光表現優秀<br/>      
                    ．8K 30p 影片錄製<br/>
                    ．可傾斜觸控螢幕        
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
