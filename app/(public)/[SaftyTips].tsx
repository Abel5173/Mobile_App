import { useGlobalSearchParams } from "expo-router";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useFetchTip } from "../../api/fetchTip";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafetyTip } from "../../Utils/type";
import { Color } from "../../constants/color";

export default function SafetyTipDetail() {
  const { tipId } = useGlobalSearchParams();
  console.log(tipId);
  if (typeof tipId === "string") {
    const tip: SafetyTip | undefined = useFetchTip(tipId);
    console.log(tip);

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {tip ? (
            <>
              <View style={styles.title}>
                <Text style={styles.title}>{tip.title}</Text>
              </View>
              <Image source={{ uri: tip.img }} style={styles.image} />
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{tip.description}</Text>
              </View>
            </>
          ) : (
            <ActivityIndicator size="large" color="#000" />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // justifyContent: "center",
    // alignItems: "center",
  },
  content: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
    color: Color.primary,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    userSelect: "text",
    textAlign: "justify",
    color: "#707070",
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: "#e0e0e0",
    textShadowRadius: 5,
  },
  descriptionContainer: {
    backgroundColor: "#fff",
    elevation: 5,
    opacity: 0.9,
    borderRadius: 10,
    padding: 20,
    backfaceVisibility: "visible",
    borderBottomColor: Color.primary,
  },
});
