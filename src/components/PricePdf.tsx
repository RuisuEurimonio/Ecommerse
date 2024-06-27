import { CardProductProps } from "@/types/Props";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    title:{
        textAlign: "center",
        fontSize: "15px",
        marginVertical: 20
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 60
    },
    headerSubitems: {
        fontSize: 14
    },
    headerTitle:{
        fontSize: "50px",
        color: "#ff0000",
        fontWeight: "extrabold",
    }
})

const PricePdf = () => {

    const date = new Date();
    const options : Intl.DateTimeFormatOptions= { year: 'numeric', month: '2-digit', day: '2-digit'};
    const formattedDate = new Intl.DateTimeFormat("es-CO", options).format(date);

    return(
    <Document>
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
                            Cotización
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
        </Page>
    </Document>
    )
}

export default PricePdf;