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
        products: [],
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
        onSetProducts: ( state, { payload } ) => {
            state.products = payload;
            state.isLoading = false;
        },
        
        
       onAddErrorMessage: ( state, { payload } ) => {
            state.message.error = payload;
        },
        onAddSuccessMessage: ( state, { payload } ) => {
            state.message.success = payload;
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

        onCleanProducts: ( state ) => {
            state.products = []
            state.activeAttribute = null;
            state.isLoading = true;
        },
        onCleanActiveCategory: ( state ) => {
            state.activeAttribute = null;
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
    onCleanProducts,
    onSetProducts,
} = attibutesSlice.actions;