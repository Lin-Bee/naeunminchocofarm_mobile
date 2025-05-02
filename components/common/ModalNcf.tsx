import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

interface ModalProps{
  animationType:string,
  transparent:boolean,
  visible:boolean,
  onRequestClose:()=>void,
  modalText:string
}

const ModalNcf = ({animationType,transparent,visible,onRequestClose,modalText} : ModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onRequestClose();
      }}>
      <View className="flex-1 justify-center items-center">
        <View className="m-5 bg-white rounded-2xl p-8 items-center shadow shadow-black">
          <Text className="mb-4 text-center">{modalText}</Text>
          <Pressable
            className="rounded-xl px-4 py-2 bg-green-500"
            onPress={onRequestClose}
          >
            <Text className="text-white font-bold text-center">닫기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

export default ModalNcf
