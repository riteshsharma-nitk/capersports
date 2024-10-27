import PropTypes from 'prop-types';
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
import { fDate } from '../../../utils/formatTime';
import styles from './InvoiceStyle';
InvoicePDF.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function InvoicePDF({ invoice }) {
  const {
    orderItems,
    taxPrice,
    orderStatus,
    shippingInfo,
    createdAt,
    itemsPrice,
    _id,
    totalPrice,
  } = invoice;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={[styles.gridContainer, styles.mbTitle40]}>
          <Image source="/logo/logo_full.png" style={{ height: 32 }} />
          <Text style={styles.h3Title}>CAPER SPORTS</Text>
          </View>
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text style={styles.h3}>{orderStatus}</Text>
            <Text> {_id} </Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Invoice from</Text>
            <Text style={styles.body1}>{"Avinash Sharma"}</Text>
            <Text style={styles.body1}>{"SH-47, Sector 141, Noida,"}</Text>
            <Text style={styles.body1}>{"Gautam Buddha Nagar, Uttar Pradesh, 201305"}</Text>
            <Text style={styles.body1}>{"9999557455"}</Text>
          </View>
         

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Invoice to</Text>
            <Text style={styles.body1}>{"Ritesh Sharma"}</Text>
            <Text style={styles.body1}>{shippingInfo?.address}</Text>
            <Text style={styles.body1}>{shippingInfo?.phoneNo}</Text>
          </View>
        </View>
        

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Date create</Text>
            <Text style={styles.body1}>{createdAt && fDate(createdAt)}</Text>
          </View>
        </View>

        <Text style={[styles.overline, styles.mb8]}>Invoice Details</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>Item #</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Description</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>HSN/SAC Code</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Qty</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Unit price</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Discount</Text>
              </View>

              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>Total</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            {orderItems && orderItems.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCell_1}>
                  <Text>{index + 1}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>{item?.name}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{"6211"}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{item.quantity}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{item.price}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{""}</Text>
                </View>

                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{`₹${(item.price * item.quantity)}`}</Text>
                </View>
              </View>
            ))}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3} />

              <View style={styles.tableCell_3}>
                <Text>Subtotal</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{`₹${(itemsPrice)}`}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Discount</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{"0"}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>IGST(0.00%)</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{0}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>CGST(2.50%)</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{itemsPrice && `₹${(itemsPrice)*0.025}`}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>SGST(2.50%)</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{itemsPrice && `₹${(itemsPrice)*0.025}`}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}>Total</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}>{`₹${(totalPrice)}`}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.bankDetailBox]}>
          <View style={styles.col6}>

          <Text style={styles.body1}>Caper Sports</Text>
          <Text style={styles.body1}>Canara Bank</Text>
          <Text style={styles.body1}>A/c no. - 5549201000080</Text>
          <Text style={styles.body1}>IFSC - CNRB0005549</Text>
          <Text style={styles.body1}>Sector 45, Noida</Text>
          <Text style={styles.body1}>Uttar Pradesh - 201303</Text>
          <Text style={styles.body1}>Make all cheque payable to CAPER SPORTS.</Text>
          </View>

          <View style={styles.col6}>
            <Text style={styles.subtitle2}>Thank you for your business!</Text>
          </View>
          </View>



        <View style={[styles.gridContainer, styles.footer]}>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>TERMS & CONDITION</Text>
            <Text>• Certified that the particular given above are correct and amount indicated is
            representative of of the price actually charged and that there is no flow of 
            additional consideration directly or indirectly from the buyer.</Text>
            <Text>• Goods once sold will not be taken back.</Text>
            <Text>• Interest will be charged @ 18% per annum if the payment is not made on the due date.</Text>
            <Text>• All disputes subject to Uttar Pradesh Jurisdiction only.</Text>

          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Have a Question?</Text>
            <Text>capersports.in@gmail.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
