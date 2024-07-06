"use client"

import { ArticleProps } from "@/types/Props";
import { Page, Text, View, Document, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { moneyFormatter } from "./utils";
import image from "@/assets/img/logo.png"

type PricePdfProps = {
    items:{
        0: ArticleProps,
        1: number
    }[],
    subtotal: number,
    discounts: number,
    sendPrice: number,
    total: number,
    observations: string
}

const TITLE_SIZE = 15;
const SUBTITLE_SIZE = 12;
const TEXT_SIZE = 9;

const PricePdf : React.FC<PricePdfProps> = ({items, subtotal, discounts, sendPrice, total, observations}) => {

    const date = new Date();
    const options : Intl.DateTimeFormatOptions= { year: 'numeric', month: '2-digit', day: '2-digit'};
    const formattedDate = new Intl.DateTimeFormat("es-CO", options).format(date);

    return(
    <Document >
        <Page style={styles.page}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>COTIZACIÓN</Text>
                    <Text style={styles.headerSubitems}>{formattedDate}</Text>
                    <Text style={styles.headerSubitems}>Cliente: Lauro Tauro</Text>
                    <Text style={styles.headerSubitems}>Vendedor: Generado por página web.</Text>
                </View>
                <View>
                    <Image style={styles.logo} src={image.src} /> 
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.tableTitle}>Artículos.</Text>
                <View style={styles.table}>
                    <View style={styles.tableRowView}>
                                <View style={[styles.tableCell, styles.negativeColorDecoration,  styles.borderOfLastElement, styles.tableCellTopHeader]}>
                                    <Text style={styles.tableTextCell}>  Total </Text>
                                </View>
                                <View style={[styles.tableCell, styles.negativeColorDecoration,  styles.tableCellTopHeader]}>
                                    <Text style={styles.tableTextCell}>Cantidad</Text>
                                </View>
                                <View style={[styles.tableCell, styles.negativeColorDecoration,  styles.tableCellTopHeader]}>
                                    <Text style={styles.tableTextCell}>Precio</Text>
                                </View>
                                <View style={[styles.tableCell, styles.negativeColorDecoration,  styles.tableCellTopHeader]}>
                                    <Text style={styles.tableTextCell}>Nombre</Text>
                                </View>
                                <View style={[styles.tableCell, styles.negativeColorDecoration,  styles.tableCellTopHeader]}>
                                    <Text style={styles.tableTextCell}>SKU</Text>
                                </View>
                            </View>
                    {items.map((item)=>{
                        return(
                            <View style={styles.tableRowView} key={item[0].SKU}>
                                <View style={[styles.tableCell, styles.borderOfLastElement]}>
                                    <Text>{moneyFormatter(parseFloat(item[0].precio) * item[1])}</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text>{item[1]}</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text>{moneyFormatter(parseFloat(item[0].precio))}</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text>{item[0].nombre}</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text>{item[0].SKU}</Text>
                                </View>
                            </View>
                        )
                    })}
                    <View style={styles.tableRowView}>
                        <View style={[styles.tableCellDetails, styles.detailsBorder, styles.detailsBorderLastElement]}><Text>{moneyFormatter(subtotal)}</Text></View> 
                        <View style={[styles.tableCellDetails, styles.detailsBorder]}><Text>Subtotal:</Text></View>
                        <View style={styles.tableCellEmpty}></View>
                    </View>
                    <View style={styles.tableRowView}>
                        <View style={[styles.tableCellDetails, styles.detailsBorder, styles.detailsBorderLastElement]}><Text>{moneyFormatter(discounts)}</Text></View> 
                        <View style={[styles.tableCellDetails, styles.detailsBorder]}><Text>Descuentos:</Text></View>
                        <View style={styles.tableCellEmpty}></View>
                    </View>
                    <View style={styles.tableRowView}>
                        <View style={[styles.tableCellDetails, styles.detailsBorder, styles.detailsBorderLastElement]}><Text>{moneyFormatter(sendPrice)}</Text></View> 
                        <View style={[styles.tableCellDetails, styles.detailsBorder]}><Text>Envio:</Text></View>
                        <View style={styles.tableCellEmpty}></View>
                    </View>
                    <View style={styles.tableRowView}>
                        <View style={[styles.tableCellDetails, styles.detailsBorder, styles.detailsBorderLastElement]}><Text>{moneyFormatter(total)}</Text></View> 
                        <View style={[styles.tableCellDetails, styles.detailsBorder]}><Text>Total:</Text></View>
                        <View style={styles.tableCellEmpty}></View>
                    </View>
                </View>
            </View>
            <View style={styles.subSection}>
                <View>
                    <Text style={styles.observationsTitle}>Observaciones:</Text>
                    <Text style={styles.observations}>{observations}</Text>
                </View>
                <View style={styles.footer}>
                    <Text>Cotización valida por 15 días a partir de su generación.</Text>
                    <Text>Generado por:</Text>
                    <Text>Ruisu's Software</Text>
                </View>    
            </View>
        </Page>
    </Document>
    )
}

export default PricePdf;

const styles = StyleSheet.create({
    logo:{
        width:150,
        height:150,
        filter: 'grayscale(100%)'
    },
    page:{
        marginTop: 60
    },
    footer:{
        textAlign: "center",
        fontSize: SUBTITLE_SIZE,
        marginTop: 40
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 40
    },
    headerSubitems: {
        fontSize: SUBTITLE_SIZE,
        marginVertical: 2
    },
    headerTitle:{
        fontSize: "50px",
        fontWeight: "extrabold",
    },
    section:{
        margin: 40
    },
    subSection:{
        marginHorizontal: 40
    },
    tableTitle:{
        textAlign: "center",
        fontSize: TITLE_SIZE,
        paddingVertical: 5,
        borderTop: "1px solid black",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
    },
    negativeColorDecoration:{
        backgroundColor: "black",
        color: "white"
    },
    table:{
        width: "100%",
        fontSize: TEXT_SIZE,
        textAlign: "center"
    },
    tableRowView:{
        flexDirection: "row-reverse",
    },
    borderOfLastElement:{
        borderRight: "1px solid black"
    },
    tableTextCell:{
        fontSize: SUBTITLE_SIZE,
    },
    tableCell:{
        flex: 1,
        padding: 5,
        borderBottom: "1px solid black",
        borderLeft: "1px solid black"
    },
    tableCellTopHeader:{
        borderTop: "1px solid white"
    },
    tableCellDetails:{
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 4
    },
    tableCellEmpty:{
        flex: 3,
        paddingHorizontal: 5*3+2
    },
    details:{
        textAlign: "right",
        fontSize: TEXT_SIZE
    },
    detailsText: {
        marginLeft: 5
    },
    detailsBorder:{
        borderLeft: "1px solid black",
        borderBottom: "1px solid black",
    },
    detailsBorderLastElement:{
        borderRight: "1px solid black"
    },
    observationsTitle:{
        fontSize: SUBTITLE_SIZE
    },
    observations:{
        fontSize: TEXT_SIZE
    }
})
