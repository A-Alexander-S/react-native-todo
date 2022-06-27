import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './Gallery.style';
import { GalleryPropsType } from './Gallery.types';

export const Gallery = ({ imgs, onPress }: GalleryPropsType) => (
  <>
    {imgs.map((img) => (
      <TouchableOpacity
        key={img.fileName}
        onPress={() => onPress(img.uri)}>
        <Image
          resizeMode='center'
          source={{ uri: img.uri }}
          style={styles.img} />
      </TouchableOpacity>
    ))}
  </>
);