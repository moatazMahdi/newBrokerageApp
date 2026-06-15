import { StyleSheet } from "react-native";
import { hp, wp } from "../../utils/dimensions";

const styles = StyleSheet.create({
    contentContainer: {
       flex:1,
         paddingHorizontal:wp(20),
         backgroundColor:'#fff',
         borderTopLeftRadius:wp(20),
         borderTopRightRadius:wp(20),
         paddingTop:hp(20),
    },
    content: {
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: hp(120),
    },
});

export default styles;
