import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafetyTip } from "../../Utils/type";
import { useFetchSafetyTip } from "../../api/fetchSafetyTip";
import { Link, router } from "expo-router";
import { Color } from "../../constants/color";

const SafetyTips: React.FC = () => {
  const onReadMorePress = (tipId: string) => {
    router.push({
      pathname: "../(public)/tipId",
      params: {
        tipId,
      },
    });
  };
  const renderSafetyTipItem = ({
    item,
    index,
  }: {
    item: SafetyTip;
    index: number;
  }) => (
    <View key={index} style={styles.safetyTipItem}>
      <Image source={{ uri: item.img }} style={styles.image} />
      <Text style={styles.tipTitle}>{item.title}</Text>
      <TouchableOpacity onPress={() => onReadMorePress(item.tipId)}>
        <Text style={styles.tipDescription}>
          {`${item.description.substring(0, 100)}... `}
          <Text style={styles.readMoreText}>Read More</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );

  const safetyTips: SafetyTip[] = useFetchSafetyTip();

  return (
    <View style={styles.container}>
        <FlatList
          data={safetyTips}
          renderItem={renderSafetyTipItem}
          keyExtractor={(item) => item.tipId}
          numColumns={1}
        />
    </View>
  );
};

export default SafetyTips;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    alignItems: "center",
  },
  screenTitle: {},
  safetyTipItem: {
    backgroundColor: "#fff",
    elevation: 5,
    opacity: 0.9,
    borderRadius: 10,
    margin: 10,
    backfaceVisibility: "visible",
    borderBottomColor: Color.primary,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: Color.primary,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  tipDescription: {
    fontSize: 16,
    lineHeight: 24,
    userSelect: "text",
    textAlign: "justify",
    margin: 10,
    color: "#303030",
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: "#e0e0e0",
    textShadowRadius: 5,
  },
  readMoreText: {
    color: Color.primary,
    // fontWeight: "bold",
  },
});
