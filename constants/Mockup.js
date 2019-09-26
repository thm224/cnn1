const mockData = {
  listPromotion: [
    {
      id: 1,
      title:
        "Giảm giá lên đến 200.000 đồng khi thanh toán bằng QRPAY trên ứng dụng ABBANKmobile",
      time: "06/11/2019",
      subContent:
        "Áp dụng đến hết ngày 30/09/2019 hoặc đến khi hết mã khuyến mại của chương trình, tùy theo điều kiện nào đến trước",
      image:
        "https://www.abbank.vn/Uploads/Root/2019/6/11/banner-web-can-quet-qr-code-360x263px-20190611145709.jpg"
    },
    {
      id: 2,
      title: "Tổng hợp điểm ưu thẻ cho chủ thẻ ABBANK (Tháng 7/2019)",
      time: "17/07/2019",
      subContent:
        "từ 07/08 – 11/08/2019, sẽ đồng loạt diễn ra đại tiệc giảm giá Warehouse Sale tại Vương quốc đồ chơi MY KINGDOM trên khắp các tỉnh thành",
      image:
        "https://www.abbank.vn/Uploads/Root/2016/6/20/abbank-mobile-banking-20160620141739.jpg"
    },
    {
      id: 3,
      title: "Chương trình khuyến mại “365 ngày vui cùng thẻ ABBANK tại VINID”",
      time: "15/07/2019",
      subContent:
        "Từ 15/07/2019 – 15/09/2019 hoặc cho đến khi nào hết ngân sách chương trình, tùy theo điều kiện nào đến trước",
      image:
        "https://www.abbank.vn/Uploads/Root/2019/7/15/fb-vinid-01-20190715132210.jpg"
    },
    {
      id: 4,
      title: `“ĐẶT VÉ MÁY BAY - VI VU THẾ GIỚI” - HOÀN TIỀN TRỰC TIẾP LÊN ĐẾN 200.000 ĐỒNG`,
      time: "27/06/2019",
      subContent: `Hoàn tiền trực tiếp khi sử dụng tính năng "Đặt vé máy bay" trên ABBANKmobile, lên đến 200.000 VNĐ`,
      image:
        "https://www.abbank.vn/Uploads/Root/2019/6/27/banner-wweb-360x263px-20190627094417.jpg"
    },
    {
      id: 5,
      title: `Nhận “mưa” giải thưởng từ chương trình “MUA SẮM CÙNG THẺ ABBANK – HOÀN TIỀN VINID SIÊU ĐÃ”`,
      time: "20/06/2019",
      subContent:
        "Chương trình khuyến mãi “MUA SẮM CÙNG THẺ ABBANK – HOÀN TIỀN VINID SIÊU ĐÃ” đã tìm được chủ nhân của hàng loạt giải thưởng có giá trị như xe",
      image:
        "https://www.abbank.vn/Uploads/Root/2019/6/20/banner-web-365-360x263px-20190620150650.jpg"
    },
    {
      id: 6,
      title:
        "Nhanh tay quét ưu đãi lên đến 500.000 đồng cùng QRPAY trên ABBANKMOBILE",
      time: "18/06/2019",
      subContent:
        "Khách hàng chỉ cần nhập mã giảm giá hợp lệ sẽ được hưởng ưu đãi hấp dẫn lên tới 500.000 đồng  trên mỗi hóa đơn khi thanh toán bằng tính năng QRPay...",
      image:
        "https://www.abbank.vn/Uploads/Root/2019/6/18/banner-web-360x263px-20190618174500.jpg"
    }
  ],
  listPromotionBusiness: [
    {
      id: 1,
      title: "Ưu đãi mua ô tô 3s",
      time: "10/04/2018",
      subContent:
        "Áp dụng khách hàng doanh nghiệp vừa và nhỏ có nhu cầu vay mua xe ô tô",
      image:
        "https://www.abbank.vn/Uploads/Root/2018/4/10/icon-mua-oto-3s-20180410195806.jpg"
    },
    {
      id: 2,
      title: `Chương trình cho vay ưu đãi vốn ngắn hạn “SME – Gắn Kết Bền Lâu”`,
      time: "27/10/2017",
      subContent: `Từ ngày 16/10/2017 đến ngày 31/03/2018), Khối SME – Ngân hàng TMCP An Bình (ABBANK), triển khai Chương trình cho vay ưu đãi vốn ngắn hạn “SME – Gắn Kết Bền Lâu”.`,
      image:
        "https://www.abbank.vn/Uploads/Root/2018/4/10/icon-mua-oto-3s-20180410195806.jpg"
    },
    {
      id: 3,
      title: `Mua xe liền tay giảm ngay lãi suất`,
      time: "11/09/2017",
      subContent:
        "Nhằm tạo điều kiện để Quý khách hàng tiếp cận nguồn vốn ưu đãi, ngân hàng TMCP An Bình (ABBANK) hân hạnh triển khai chương trình “MUA XE LIỀN TAY, GIẢM NGAY LÃI...",
      image:
        "https://www.abbank.vn/Uploads/Root/2017/11/9/sme-mua-xe-icon-web-360x263-20171109112401.jpg"
    }
  ],
  listNotification: [
    {
      id: 1,
      title: "Bạn đã checkout tại Camera Số 2",
      time: "16:30:16 18/07/2019",
      type: 1
    },
    {
      id: 1,
      title: "Bạn đã checkin tại Camera Số 3",
      time: "08:00:16 18/07/2019",
      type: 0
    },
    {
      id: 1,
      title: "Bạn đã checkout tại Camera Số 3",
      time: "16:35:55 17/07/2019",
      type: 1
    },
    {
      id: 1,
      title: "Bạn đã checkin tại Camera Số 1",
      time: "07:58:10 17/07/2019",
      type: 0
    },
    {
      id: 1,
      title: "Bạn đã checkout tại Camera Số 3",
      time: "16:55:55 16/07/2019",
      type: 1
    },
    {
      id: 1,
      title: "Bạn đã checkin tại Camera Số 2",
      time: "07:55:10 16/07/2019",
      type: 0
    },

    {
      id: 1,
      title: "Bạn đã checkout tại Camera Số 3",
      time: "16:42:55 15/07/2019",
      type: 1
    },
    {
      id: 1,
      title: "Bạn đã checkin tại Camera Số 1",
      time: "07:50:10 15/07/2019",
      type: 0
    },
    {
      id: 1,
      title: "Bạn đã checkout tại Camera Số 3",
      time: "16:25:05 14/07/2019",
      type: 1
    },
    {
      id: 1,
      title: "Bạn đã checkin tại Camera Số 1",
      time: "07:57:10 14/07/2019",
      type: 0
    },
    {
      id: 1,
      title: "Bạn đã checkout tại Camera Số 3",
      time: "16:35:55 13/07/2019",
      type: 1
    },
    {
      id: 1,
      title: "Bạn đã checkin tại Camera Số 1",
      time: "07:55:10 13/07/2019",
      type: 0
    },
    {
      id: 1,
      title: "Bạn đã checkout tại Camera Số 3",
      time: "16:35:55 12/07/2019",
      type: 1
    },
    {
      id: 1,
      title: "Bạn đã checkin tại Camera Số 1",
      time: "07:58:10 12/07/2019",
      type: 0
    },
    {
      id: 1,
      title: "Bạn đã checkout tại Camera Số 3",
      time: "16:35:55 11/07/2019",
      type: 1
    },
    {
      id: 1,
      title: "Bạn đã checkin tại Camera Số 1",
      time: "07:58:10 11/07/2019",
      type: 0
    }
  ]
};

export default mockData;
