import React from 'react'
import { Document, Page, Text, View, StyleSheet,} from '@react-pdf/renderer';
// import {Table,TableHeader,TableCell,TableBody,DataTableCell} from "@david.kucsai/react-pdf-table"
const InvoiceComp = ({order,}) => {
    const{orderStatus,paymentIntent}=order
  
    

  return (
    <Document>
        <Page style={styles.body}>
            <View>
                <Text style={styles.header}>~ {new Date().toLocaleString()} ~</Text>
                <Text style={styles.title}>Order Invoice</Text>
                <Text style={styles.author}>Ecommerce Store</Text>
                <Text style={styles.subtitle}>Order Summary</Text>
                {/* <Table>
                    <TableHeader>
                        <TableCell>Title</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Color</TableCell>
                    </TableHeader>
                </Table> */}
                {/* We use another table for display data */}
                 {/* <Table data={order.products}>  */}
                 {/* we give the data in form of array */}
                    {/* <TableBody>
                        <DataTableCell getContent={(x)=>x.product.title}/>
                        <DataTableCell getContent={(x)=>`$${x.product.price}`}/>
                        <DataTableCell getContent={(x)=>x.count}/>
                        <DataTableCell getContent={(x)=>x.product.brand}/>
                        <DataTableCell getContent={(x)=>x.product.color}/>
                        
                    </TableBody> */}
                {/* </Table> */}
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
  )
}
const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
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
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
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
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  });
export default InvoiceComp