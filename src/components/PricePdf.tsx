import { CardProductProps } from "@/types/Props";
import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import { moneyFormatter } from "./utils";

type PricePdfProps = {
    items:{
        0: CardProductProps,
        1: string
    }[],
    subtotal: number,
    discounts: number,
    sendPrice: number,
    total: number
}

const PricePdf : React.FC<PricePdfProps> = ({items, subtotal, discounts, sendPrice, total}) => {

    const date = new Date();
    const options : Intl.DateTimeFormatOptions= { year: 'numeric', month: '2-digit', day: '2-digit'};
    const formattedDate = new Intl.DateTimeFormat("es-CO", options).format(date);

    return(
    <Document >
        <Page>
            <View style={styles.title}>
                <Text>
                    Generado por:
                </Text>
                <Text>
                    Ruisu's Software
                </Text>
                <Text>
                    Image
                </Text>
            </View>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>
                            COTIZACIÓN
                    </Text>
                    <Text style={styles.headerSubitems}>
                        {formattedDate}
                    </Text>
                    <Text style={styles.headerSubitems}>
                        Cliente: Lauro Tauro                                                
                    </Text>
                    <Text style={styles.headerSubitems}>
                        Generado por página web.
                    </Text>
                </View>
                <Text> Image </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.tableTitle}>
                    Artículos.
                </Text>
                <View style={styles.table}>
                    <View style={styles.tableRowView}>
                                <View style={styles.tableCell}> <Text style={styles.tableTextCell}>  Total </Text> </View>
                                <View style={styles.tableCell}> <Text style={styles.tableTextCell}>  Cantidad </Text> </View>
                                <View style={styles.tableCell}> <Text style={styles.tableTextCell}>  Precio </Text> </View>
                                <View style={styles.tableCell}> <Text style={styles.tableTextCell}>  Nombre </Text> </View>
                                <View style={styles.tableCell}> <Text style={styles.tableTextCell}>  SKU </Text> </View>
                            </View>
                    {items.map((item)=>{
                        return(
                            <View style={styles.tableRowView} key={item[0].SKU}>
                                <View style={styles.tableCell}> <Text> {moneyFormatter(parseFloat(item[0].precio) * parseFloat(item[1]))} </Text> </View>
                                <View style={styles.tableCell}> <Text> {item[1]} </Text> </View>
                                <View style={styles.tableCell}> <Text> {moneyFormatter(parseFloat(item[0].precio))} </Text> </View>
                                <View style={styles.tableCell}> <Text> {item[0].nombre} </Text> </View>
                                <View style={styles.tableCell}> <Text> {item[0].SKU} </Text> </View>
                            </View>
                        )
                    })}
                    <View style={styles.tableRowView}>
                        <View style={styles.tableCell}><Text> {moneyFormatter(subtotal)}  </Text></View> 
                        <View style={styles.tableCell}><Text> Subtotal: </Text></View>
                        <View style={styles.tableCellEmpty}></View>
                    </View>
                    <View style={styles.tableRowView}>
                        <View style={styles.tableCell}><Text> {moneyFormatter(discounts)}  </Text></View> 
                        <View style={styles.tableCell}><Text> Descuentos: </Text></View>
                        <View style={styles.tableCellEmpty}></View>
                    </View>
                    <View style={styles.tableRowView}>
                        <View style={styles.tableCell}><Text> {moneyFormatter(sendPrice)}  </Text></View> 
                        <View style={styles.tableCell}><Text> Envio: </Text></View>
                        <View style={styles.tableCellEmpty}></View>
                    </View>
                    <View style={styles.tableRowView}>
                        <View style={styles.tableCell}><Text> {moneyFormatter(total)}  </Text></View> 
                        <View style={styles.tableCell}><Text> Total: </Text></View>
                        <View style={styles.tableCellEmpty}></View>
                    </View>
                </View>
                <View>
                    <Text style={styles.observationsTitle}> Observaciones: </Text>
                    <Text style={styles.observations}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore molestias soluta culpa tenetur quis libero dignissimos rem magnam! Libero repellendus rem molestias ipsum distinctio aspernatur sequi ab fuga animi. </Text>
                </View>
            </View>
        </Page>
    </Document>
    )
}

export default PricePdf;

const styles = StyleSheet.create({
    title:{
        textAlign: "center",
        fontSize: "15px",
        marginVertical: 15
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 40
    },
    headerSubitems: {
        fontSize: 12,
        marginVertical: 2
    },
    headerTitle:{
        fontSize: "50px",
        color: "#ff0000",
        fontWeight: "extrabold",
    },
    section:{
        marginHorizontal: 40
    },
    tableTitle:{
        textAlign: "center",
        fontSize: 15,
        marginBottom: 5
    },
    table:{
        width: "100%",
        fontSize: 9,
        textAlign: "center"
    },
    tableRowView:{
        flexDirection: "row-reverse",
    },
    tableTextCell:{
        fontSize: 12,
    },
    tableCell:{
        flex: 1,
        padding: 8,
    },
    tableCellEmpty:{
        flex: 3,
        paddingHorizontal: 8*3
    },
    details:{
        textAlign: "right",
        fontSize: 9
    },
    detailsText: {
        marginLeft: 5
    },
    observationsTitle:{
        fontSize: 12
    },
    observations:{
        fontSize: 9
    }
})
