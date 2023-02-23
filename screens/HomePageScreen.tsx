import { StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { Text, View } from "../components/Themed";
import Searchbar from "../components/SearchFilter";
import HorizontalScrollMenu, {
	RouteProps,
} from "@nyashanziramasanga/react-native-horizontal-scroll-menu/src";
import ProductCard from "../components/ProductCard";
import { fetchAPIwithToken } from "../hooks/useAPI";
import { getMachines, getCategories } from "../hooks/useDatabase";

export default function HomePageScreen() {
	const [NavigationTabs, setNavigationTabs] = useState<
		| [
				{
					id: number;
					name: string;
				}
		  ]
	>([{ id: 1, name: "nom" }]);
	const [selectedTab, setSelectedTab] = useState(NavigationTabs[0]?.id);
	const [searchValue, setSearchValue] = useState("");
	const [products, setProducts] = useState([]);

	const filteredProducts = products[selectedTab]
		? products[selectedTab].filter(
				(product) =>
					product.name
						.toLowerCase()
						.includes(searchValue.toLowerCase()) ||
					product.ref
						.toLowerCase()
						.includes(searchValue.toLowerCase())
		  )
		: [];

	const onTabPress = (route: RouteProps) => {
		setSelectedTab(route.id);
	};

	const onSearchValueChange = (value: string) => {
		setSearchValue(value);
	};

	React.useEffect(() => {
		getCategories().then((categories) => {
			const tabs = categories.map((category: any, index: number) => {
				return { id: index + 1, name: category.nom };
			});
			setNavigationTabs(tabs);
			getMachines().then((result) => {
				const machines = result.map((machine: any) => {
					return {
						id: machine._id,
						name: machine.nom,
						ref: machine.ref_machine,
						brand: machine.marque,
						image: "https://picsum.photos/200/300",
						category: machine.category.nom,
					};
				});
				let tmp = {};
				tabs.forEach(function (category: any) {
					tmp[category.id] = machines.filter(
						(machine: any) => machine.category == category.name
					);
				});
				setProducts(tmp);
			});
		});
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<Searchbar
				value={searchValue}
				updateSearch={onSearchValueChange}
				style={{ marginTop: "8%" }}
			/>
			<HorizontalScrollMenu
				items={NavigationTabs}
				onPress={onTabPress}
				selected={selectedTab}
				activeBackgroundColor={"#003D5C"}
				activeTextColor={"white"}
				itemWidth={80}
				scrollAreaStyle={{ height: 50 }}
			/>
			<ScrollView style={styles.down}>
				{filteredProducts.map((product) => (
					<ProductCard key={product.ref} product={product} />
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	down: {
		marginBottom: 25,
	},
});
