import { IOrderPayment } from "@/interfaces/order";
import { formatMoney } from "@/lib/utils";
const Invoice = ({ order }: { order: IOrderPayment }) => {
  const printInvoice = () => {
    const printContent = `
    <div style="max-width: 800px;margin: auto;padding: 16px;border: 1px solid #eee;font-size: 16px;line-height: 24px;font-family: 'Inter', sans-serif;color: #555;background-color: #F9FAFC;">
      <table style="font-size: 12px; line-height: 20px;">
        <thead>
          <tr>
            <td style="padding: 0 16px 18px 16px;">
              <h1 style="color: #1A1C21;font-size: 18px;font-style: normal;font-weight: 600;line-height: normal;">Toinh</h1>
              <p>Chi tiết hoá đơn</p>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <table style="background-color: #FFF; padding: 20px 16px; border: 1px solid #D7DAE0;width: 100%; border-radius: 12px;font-size: 12px; line-height: 20px; table-layout: fixed;">
                <tbody>
                  <tr>
                    <td style="vertical-align: top; width: 30%; padding-right: 20px;padding-bottom: 35px;">
                      <p style="font-weight: 700; color: #1A1C21;">Khách hàng: ${
                        order.recipientName
                      }</p>
                      <p style="color: #5E6470;">Địa chỉ: ${
                        order.address?.specific && order.address?.commune + ", "
                      }${order.address?.commune}, ${order.address?.district}, ${
      order.address?.province
    }</p>
                      <p style="color: #5E6470;">Điện thoại: ${
                        order.recipientPhone
                      }</p>
                      <p style="color: #5E6470;">Email: ${
                        order.userId?.email
                      }</p>
                      <p style="color: #5E6470;">Ghi chú: ${
                        order.noteMessage
                      }</p>
                    </td>
                    <td></td>
                    <td style="vertical-align: top;padding-bottom: 35px;">
                      <table style="table-layout: fixed;width:-webkit-fill-available;">
                        <tr>
                          <th style="text-align: left; color: #1A1C21;">Hoá đơn #:</th>
                          <td style="text-align: right;">${order._id}</td>
                        </tr>
                        <tr>
                          <th style="text-align: left; color: #1A1C21;">Ngày</th>
                          <td style="text-align: right;">${new Date(
                            order?.createdAt || ""
                          ).toLocaleDateString("vi-VN")}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <table style="width: 100%;border-spacing: 0;">
                        <thead>
                          <tr style="text-transform: uppercase;">
                            <td style="padding: 8px 0; border-block:1px solid #D7DAE0;">Sản phẩm</td>
                            <td style="padding: 8px 0; border-block:1px solid #D7DAE0; width: 40px;">Số lượng</td>
                            <td style="padding: 8px 0; border-block:1px solid #D7DAE0; text-align: end; width: 100px;">Giá</td>
                            <td style="padding: 8px 0; border-block:1px solid #D7DAE0; text-align: end; width: 120px;">Thành tiền</td>
                          </tr>
                        </thead>
                        <tbody>
                          ${order?.orderItems
                            .map(
                              (item) => `
                            <tr>
                              <td style="padding-block: 12px;">
                                <p style="font-weight: 700; color: #1A1C21;">${
                                  item?.productId?.name
                                }</p>
                                <p style="color: #5E6470;">${
                                  item?.selectedVariant?.colorId?.name
                                }, Size ${
                                item?.selectedVariant?.sizeId?.name
                              }</p>
                              </td>
                              <td style="padding-block: 12px;">
                                <p style="font-weight: 700; color: #1A1C21;">x${
                                  item.quantity
                                }</p>
                              </td>
                              <td style="padding-block: 12px; text-align: end;">
                                <p style="font-weight: 700; color: #1A1C21;">${formatMoney(
                                  Number(item?.productId?.price || 0) +
                                    Number(
                                      item?.selectedVariant?.extra_price || 0
                                    )
                                )}</p>
                              </td>
                              <td style="padding-block: 12px; text-align: end;">
                                <p style="font-weight: 700; color: #1A1C21;">${formatMoney(
                                  Number(item?.totalQuantity || 0)
                                )}</p>
                              </td>
                            </tr>`
                            )
                            .join("")}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td style="padding: 12px 0; border-top:1px solid #D7DAE0;"></td>
                            <td style="border-top:1px solid #D7DAE0;" colspan="3">
                              <table style="width: 100%;border-spacing: 0;">
                                <tbody>
                                  <tr>
                                    <th style="padding-top: 12px;text-align: start; color: #1A1C21;">Tổng giá sản phẩm</th>
                                    <td style="padding-top: 12px;text-align: end; color: #1A1C21;">${formatMoney(
                                      Number(order?.totalAmount || 0)
                                    )}</td>
                                  </tr>
                                  <tr>
                                    <th style="padding: 12px 0;text-align: start; color: #1A1C21;">Giảm</th>
                                    <td style="padding: 12px 0;text-align: end; color: #1A1C21;">${
                                      order?.discountId?.isPercentage
                                        ? `${order?.discountId?.value}%`
                                        : formatMoney(
                                            Number(
                                              order?.discountId?.value || 0
                                            )
                                          )
                                    }</td>
                                  </tr>
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <th style="padding: 12px 0 30px 0;text-align: start; color: #1A1C21;border-top:1px solid #D7DAE0;">Tổng tiền</th>
                                    <th style="padding: 12px 0 30px 0;text-align: end; color: #1A1C21;border-top:1px solid #D7DAE0;">${formatMoney(
                                      Number(order?.finalAmount || 0)
                                    )}</th>
                                  </tr>
                                </tfoot>
                              </table>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td style="padding-top: 30px;">
              <p style="display: flex; gap: 0 13px;">
                <span style="color: #1A1C21;font-weight: 700;">Nguyễn Huy Tới</span>
                <a href="tel:+84 0385521231">Điện thoại: 0385521231</a>
              </p>
              <p style="color: #1A1C21;">Mọi thắc mắc, liên hệ tại <a href="mailto:toidz25102004@gmail.com" style="color: #000;">toidz25102004@gmail.com</a>.</p>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;

    const popupWin = window.open("", "_blank");
    popupWin?.document.open();
    popupWin?.document.write(`
    <html>
      <head>
        <title>Hoá đơn</title>
        <style>
          *,
*::before,
*::after {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html,
body {
	margin: 0;
	padding: 0;
}
        </style>
      </head>
      <body>${printContent}</body>
    </html>
  `);
    popupWin?.document.close();
    popupWin?.print();
  };
  return (
    <button
      onClick={printInvoice}
      className="text-blue-500 text-center text-sm"
    >
      Xuất hoá đơn
    </button>
  );
};

export default Invoice;
