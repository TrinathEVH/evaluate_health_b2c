//// ********************* with neomorph  **********************************
import React, {useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Color} from '../theme';
import {NeomorphBlur} from 'react-native-neomorph-shadows';

const width = (Dimensions.get('window').width - 64) / 2;

const Checkbox = ({label, labelColor}, CheckboxProps) => {
  //const [checkStatus, setCheckStatus] = useState(false);
  return (
    <TouchableOpacity>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginRight: 10,
          marginLeft: 5,
        }}>
        <View style={{width: 28}}>
          <NeomorphBlur style={styles.neoCheckBoxOuter}>
            <NeomorphBlur style={styles.neoCheckBoxInner} />
          </NeomorphBlur>
        </View>
        <View style={{}}>
          <Text style={{...styles.label, color: labelColor}}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
Checkbox.defaultProps = {
  checkStatus: false,
};
const styles = StyleSheet.create({
  checkedBox: {
    height: 20,
    width: 20,
    backgroundColor: Color.white,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.checkboxColor,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unCheckedBox: {
    height: 20,
    width: 20,
    backgroundColor: Color.white,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.textColor,
    padding: 5,
  },
  innerCheckBox: {
    height: 10,
    width: 10,
    borderRadius: 2,
    backgroundColor: Color.checkboxColor,
  },
  label: {
    //color: Color.ProfileEditButton,
    fontWeight: '500',
    fontSize: 14,
    // fontSize: 17,
    // fontFamily: "GothamRounded-Medium",
  },
  neoCheckBoxOuter: {
    width: 22,
    height: 22,
    borderRadius: 4,
    shadowRadius: 2,
    backgroundColor: Color.lightgray,
    shadowOffset: {width: -2, height: -2},
    justifyContent: 'center',
    alignItems: 'center',
  },
  neoCheckBoxInner: {
    width: 14,
    height: 14,
    shadowRadius: 2,
    shadowOffset: {width: 2, height: 2},
    borderRadius: 2,
    backgroundColor: Color.gray,
  },
});

export default Checkbox;
////********************  Without NeoMorphs  ********************************** */
// import React from 'react';
// import {
//   View,
//   TouchableWithoutFeedback,
//   Text,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import {Color} from '../theme';
// import {NeomorphBlur} from 'react-native-neomorph-shadows';
// //import { Icon } from "react-native-vector-icons/FontAwesome5";

// const width = (Dimensions.get('window').width - 64) / 2;

// const Checkbox = ({label}, CheckboxProps) => {
//   return (
//     <TouchableOpacity>
//       <View
//         style={{
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'flex-start',
//           alignItems: 'center',
//         }}>
//         <View style={{width: 24}}>
//           <View style={styles.checkedBox}>
//             <View style={styles.innerCheckBox} />
//           </View>
//         </View>
//         <View style={{width: width}}>
//           <Text style={styles.label}>{label}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   checkedBox: {
//     height: 20,
//     width: 20,
//     backgroundColor: Color.white,
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: Color.checkboxColor,
//     padding: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   unCheckedBox: {
//     height: 20,
//     width: 20,
//     backgroundColor: Color.white,
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: Color.textColor,
//     padding: 5,
//   },
//   innerCheckBox: {
//     height: 10,
//     width: 10,
//     borderRadius: 2,
//     backgroundColor: Color.checkboxColor,
//   },
//   label: {
//     //color: Color.ProfileEditButton,
//     fontWeight: '500',
//     fontSize: 14,
//     // fontSize: 17,
//     // fontFamily: "GothamRounded-Medium",
//   },
// });

// export default Checkbox;
