const reducer = (state, action) => {

    if (action.type === "SET_LOADING") {
        return {
            ...state,
            isLoading: true
        };
    }


    if (action.type === "SET_SINGLE_LOADING") {
        return {
            ...state,
            isSingleLoading: true
        };
    }



    if (action.type === "API_ERROR") {
        return {
            ...state,
            isLoading: false,
            isError: true
        };
    }
    if (action.type === "SET_API_DATA") {

        const featureData = action.payload.data.filter((currElem) => {
            return (currElem.isFeatured === true)
        })

        const newlyLaunchedProducts = action.payload.data.filter((currElem) => {
            return (currElem.isNewlyLaunched === true)
        })


        return {
            ...state,
            isLoading: false,
            products: action.payload.data,
            featureProducts: featureData,
            newlyLaunchedProducts
        }
    }


    if (action.type === "SET_BIG_IMAGE") {

        return {
            ...state,
            BigImage: action.payload
        };
    }


    if (action.type === "SET_SINGLE_PRODUCT") {

        var SingleData = action.payload.products.find((currElem) => currElem._id === action.payload._id)

        var relatedData = state.products;

        relatedData = relatedData.filter(curr => curr.category === SingleData.category)

        if (relatedData.includes(SingleData)) {
            relatedData.splice(relatedData.indexOf(SingleData), 1)
        }

        SingleData.relatedData = relatedData


        return {
            ...state,
            isLoading: false,
            isError: false,
            isSingleLoading: false,
            singleProduct: SingleData,
            BigImage: SingleData.images[0]
        };
    }


    if (action.type === 'SET_NEXT_IMAGE') {

        const index = state.singleProduct.images.indexOf(state.BigImage);
        let images = state.singleProduct.images;

        let nextIndex;
        if (index === images.length - 1) {
            nextIndex = 0;
        } else {
            nextIndex = index + 1;
        }
        return {
            ...state,
            BigImage: images[nextIndex]
        };
    }

    if (action.type === 'SET_PREVIOUS_IMAGE') {
        const index = state.singleProduct.images.indexOf(state.BigImage);
        let images = state.singleProduct.images;

        let nextIndex;
        if (index === 0) {
            nextIndex = images.length - 1;
        } else {
            nextIndex = index - 1;
        }
        return {
            ...state,
            BigImage: images[nextIndex]
        };


    }




    return state;


}

export default reducer;