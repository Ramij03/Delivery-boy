import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import CategoryItem from './CategoryItem';

const CategoryList = ({ setSelectedCategory, setSelectedSection, setSelectedValue }) => {
    const [categories, setCategories] = useState([]); // State to store categories
    const [selected, setSelected] = useState(null); // To manage selected category

    useEffect(() => {
        // Fetch categories from backend when component mounts
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://192.168.1.194:6002/api/category/random'); 
                setCategories(response.data.categories); // Set the fetched categories to the state
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []); // Empty dependency array means this runs only once when the component mounts

    const handleCategorySelect = (category) => {
        if (selected === category.value) {
            // If the selected category is already pressed, unselect it
            setSelected(null);
            if (setSelectedCategory) setSelectedCategory(null);
            if (setSelectedSection) setSelectedSection(null);
            if (setSelectedValue) setSelectedValue(null);
        } else {
            // Otherwise, select this category
            setSelected(category.value);
            if (setSelectedCategory) setSelectedCategory(category);
            if (setSelectedSection) setSelectedSection(category.title);
            if (setSelectedValue) setSelectedValue(category.value);
        }
    };

    return (
        <FlatList
            data={categories} // Use the state data
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{ marginTop: 5,marginRight:10 }}
            keyExtractor={(item) => item._id ? item._id : `${item.title}_${item.value}`} // Ensure key is unique
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleCategorySelect(item)}>
                    <CategoryItem selected={selected} category={item} />
                </TouchableOpacity>
            )}
        />
    );
};

export default CategoryList;
