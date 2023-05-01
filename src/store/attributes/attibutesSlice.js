import { createSlice } from '@reduxjs/toolkit'
/*********************************************************/
export const attibutesSlice = createSlice({
    name: 'attributes',
    initialState: {  
        isSaving: false,
        message: {
            error: '',
            success: ''
        },
        numberCategories: undefined,
        attributes: [],
        categories: [],
        isLoading: false,
        editing: false,
        filtering: false,
        filter: {},
        preCategory: {
            name: '',
            updatedName: false
        },
        page: 0,
        pageSize: 5,
        activeAttribute: null, 
    },
    reducers: {
        onChangeSavingNewAttribute: ( state, { payload } ) => {
            state.isSaving = payload;
        },
        onSetActiveCategory: ( state, { payload } ) => {
            //console.log(payload);
            state.activeAttribute = payload;
        },
       
        
        onSetCategories: ( state, { payload } ) => {
            state.categories.push( payload );
            state.isLoading = false;    
        },
        onSetAttributes: ( state, { payload } ) => {
            state.attributes = payload;
            state.isLoading = false;
        },
        onSetNumberAttributes: ( state, { payload } ) => {
            state.numberCategories = payload;
        },
        onAddAttributeAtStart: ( state, { payload } ) => {
            state.attributes.unshift(payload);
        },
       onAddErrorMessage: ( state, { payload } ) => {
            state.message.error = payload;
        },
        onAddSuccessMessage: ( state, { payload } ) => {
            state.message.success = payload;
        },
        onChangeActive: ( state ) => {
            state.activeAttribute.active = !state.activeAttribute.active

            state.attributes = state.attributes.map( category => {
                if (category.attributeName === state.activeAttribute.attributeName ){
                    return state.activeAttribute;
                }
                return category;
            });
        },
        onChangeEditing: ( state, { payload } ) => {
            state.editing = payload;
        },
        onChangePreCategoryName: ( state, { payload } ) => {
            state.preCategory.name = payload;
        },
        onChangePreAttributeUpdated: ( state, { payload } ) => {
            state.preCategory.updatedName = payload;
        },
        onChangeFiltering: ( state, { payload } )=> {
            state.filtering = payload
        },
        onChangeFilter: ( state, { payload } )=> {
            state.filter = payload
        },
        onChangePageAndSize: ( state, { payload } )=> {
            state.page = payload.page;
            state.pageSize = payload.pageSize;
        },
        onCleanAttributes: ( state ) => {
            state.attributes = []
            state.activeAttribute = null;
            state.isLoading = true;
        },
        onCleanActiveCategory: ( state ) => {
            state.activeAttribute = null;
        },
        onSetAttributesRelated: ( state, { payload } ) => {
            state.activeAttribute.attributesRelated = payload;
        },
        onSetCategoriesRelated: ( state, { payload } ) => {
            state.activeAttribute.categoriesRelated = payload;
        },
        

        onCleanCategories: ( state ) => {
            state.categories = [];
        },

    }
});


// Action creators are generated for each case reducer function
export const { 
    // onChargeCategoriesUploaded,
    onAddAttributeAtStart,
    onAddAttributeNameLowerCase, 
    onAddErrorMessage,
    onAddIcon, 
    onAddImage, 
    onAddNewCategory, 
    onAddSuccessMessage,
    onChangeActive,
    onChangeEditing,
    onChangeFilter,
    onChangeFiltering,
    onChangePageAndSize,
    onChangePreCategoryName,
    onChangePreAttributeUpdated,
    onChangeSavingNewAttribute, 
    onCleanActiveCategory,
    onCleanAttributes,
    onDeleteCategory,
    onSetActiveCategory,
    onSetAttributes,
    onSetNumberAttributes,
    onUpdateAttribute,
    onSetAttributesRelated,
    onSetCategoriesRelated,
    onSetCategories,
    onCleanCategories,
} = attibutesSlice.actions;