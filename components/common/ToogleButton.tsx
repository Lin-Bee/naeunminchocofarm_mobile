import { Pressable, View } from "react-native";

export default function ToggleButton({value, onChange = () => {}}) {
  const toggleBtnOuterBackgroundColorCss = value ? "bg-[#4CAF50]" : "bg-[#ccc]";
  const toggleBtnOuterCss = `relative inline-block w-[60px] h-[30px] rounded-full hover:cursor-pointer transaction-colors duration-300 ease-in-out ${toggleBtnOuterBackgroundColorCss}`;
  const toggleBtnInnerLeftCss = value ? "left-[33px]" : "left-[3px]";
  const toggleBtnInnerCss = `absolute top-[3px] w-[24px] h-[24px] bg-white rounded-full transaction-transform duration-300 ease-in-out ${toggleBtnInnerLeftCss} shadow-md`;

  return (
    <>
      <Pressable className={toggleBtnOuterCss} onPress={e => onChange(!value)} >
        <View className={toggleBtnInnerCss} />
      </Pressable>
    </>
  );
}