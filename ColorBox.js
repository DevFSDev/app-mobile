import React from 'react';
import { View } from 'react-native';

const ColorBox = ({ color }) => {
  return (
    <View
      style={{
        width: 20,
        height: 20,
        backgroundColor: color,
        borderRadius: 5,
        borderWidth: 1,
        margin: 5,
        
      }}
    />
  );
};

export default ColorBox;