import * as React from 'react';
import { Document, Page, Text, View,StyleSheet  } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    margin: 2,
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableCellTitle: {
    flex: 1,
    margin: 2,
    padding: 5,
    width:"150px",
    whiteSpace:'nowrap',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },
  title: {
      fontSize: 24,
      textAlign: "center",
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    footer: {
      padding: "100px",
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
});

export default function InvoiceComp2({order}) {

    const{orderStatus,paymentIntent}=order
 
  return (
    // <Document>
    //     <Page>
    //         <View>
    //       <Text>How To Create PDF File In React JS - Techsolutionstuff</Text>

    //         </View>        
    //     </Page>
    // </Document>
     <Document>
      <Page size="A4" style={styles.page}>
       
        <Text style={styles.header}>~ {new Date().toLocaleString()} ~</Text>
                <Text style={styles.title}>Order Invoice</Text>
                <Text style={styles.author}>Ecommerce Store</Text>
                <Text style={styles.subtitle}>Order Summary</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCellTitle]}>Product Title</Text>
            <Text style={[styles.tableCell]}>Price</Text>
            <Text style={[styles.tableCell]}>Quantity</Text>
            <Text style={[styles.tableCell]}>Brand</Text>
            <Text style={[styles.tableCell]}>Color</Text>
          </View>
          {order.products.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={[styles.tableCell]}>{item.product.title}</Text>
              <Text style={[styles.tableCell]}>{item.product.price}</Text>
              <Text style={[styles.tableCell]}>{item.count}</Text>
              <Text style={[styles.tableCell]}>{item.product.brand}</Text>
              <Text style={[styles.tableCell]}>{item.product.color}</Text>
            </View>
          ))}
            <Text style={styles.text}>
                    <Text>
                        Date: {'                       '}{new Date(paymentIntent.created*1000).toLocaleString()}
                    </Text>{'\n'}
                    <Text>
                        Order Id: {'                   '}{paymentIntent.id}
                    </Text>{'\n'}
                    <Text>
                        Order Status: {'           '}{orderStatus}
                    </Text>{'\n'}
                    <Text>
                      {paymentIntent.status==="Cash On Delivery"?"Total Amount Paid on Delivery":"  Total Amount Paid"}: {'  '}${paymentIntent.amount/100}
                    </Text>
                    
                </Text>
                <Text style={styles.footer}>~ Thanks For Shopping With Us ~</Text>
        </View>
      </Page>
    </Document>
  );
};


