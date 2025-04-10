// ItemComponent.tsx
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import CheckBox from 'react-native-check-box';

interface MaterialItem {
  id: number;
  itemCode: string;
  itemName: string;
  batchNumber: number;
  expDate: string;
  requiredQuantity: number;
  quantity: number;
  calculatedQuantity: number;
  remainingQuantity: number;
  uomCode: string;
  note: string;
  checked: boolean;
}

interface ItemComponentProps {
  item: MaterialItem;
  index: number;
  updateField: (index: number, key: keyof MaterialItem, value: any) => void;
}

const ItemComponent: React.FC<ItemComponentProps> = ({
  item,
  index,
  updateField,
}) => {
  console.log('2', item);

  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.itemCode}</Text>
      <Text style={styles.cell}>{item.itemName}</Text>
      <Text style={styles.cell}>{item.batchNumber}</Text>
      <Text style={styles.cell}>{item.expDate}</Text>

      <View style={styles.cell}>
        <CheckBox
          isChecked={item.checked}
          onClick={() => updateField(index, 'checked', !item.checked)}
        />
      </View>

      <TextInput
        style={styles.cellInput}
        value={String(item.requiredQuantity)}
        keyboardType="numeric"
        onChangeText={val =>
          updateField(index, 'requiredQuantity', Number(val))
        }
      />

      <TextInput
        style={[styles.cellInput, {color: '#aaa'}]}
        editable={false}
        value={String(item.quantity)}
      />

      <Text style={styles.cell}>{item.calculatedQuantity}</Text>
      <Text style={styles.cell}>{item.remainingQuantity}</Text>
      <Text style={styles.cell}>{item.uomCode}</Text>
      <Text style={styles.cell}>{item.note || ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'black',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  cellInput: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 2,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
});

export default ItemComponent;

// ListEmptyComponent={
//   <Text style={{textAlign: 'center', padding: 20}}>
//     {loading ? 'Đang tải dữ liệu...' : 'Không có dữ liệu'}
//   </Text>
// }
// <View style={styles.row}>
//   <Text style={styles.cell}>{item.id + 1}</Text>
//   <Text style={styles.cell}>{item.itemCode}</Text>
//   <Text style={styles.cell}>{item.itemName}</Text>
//   <Text style={styles.cell}>{item.batchNumber}</Text>
//   <Text style={styles.cell}>{item.expDate}</Text>

//   <View style={styles.cell}>
//     <CheckBox
//       isChecked={item.checked} // <-- Sử dụng isChecked thay cho value
//       onClick={() => updateField(index, 'checked', !item.checked)} // Toggle checkbox state
//     />
//   </View>

//   <TextInput
//     style={styles.cellInput}
//     value={String(item.requiredQuantity)}
//     keyboardType="numeric"
//     onChangeText={val =>
//       updateField(index, 'requiredQuantity', Number(val))
//     }
//   />

//   <TextInput
//     style={[styles.cellInput, {color: '#aaa'}]}
//     editable={false}
//     value={String(item.quantity)}
//   />

//   <Text style={styles.cell}>{item.calculatedQuantity}</Text>
//   <Text style={styles.cell}>{item.remainingQuantity}</Text>
//   <Text style={styles.cell}>{item.uomCode}</Text>
//   <Text style={styles.cell}>{item.note || ''}</Text>
// </View>
