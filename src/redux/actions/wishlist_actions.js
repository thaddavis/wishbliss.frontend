import axios from "axios";
import get from "lodash.get";
import { showError } from "../../utility/showError";

export const addWish = (wishlistId, wishType, wishVal) => {
  return async function (dispatch, getState) {
    try {
      // debugger;
      await axios.post(`${process.env.REACT_APP_SERVER_HOST}/wishlist_items`, {
        wishlist: {
          wishlist_id: wishlistId,
          thing_type: wishType,
          thing_val: wishVal,
        },
      });

      dispatch(getWishListState());
    } catch (e) {
      showError(e);
    }
  };
};

export const removeWish = (item) => {
  return async function (dispatch, getState) {
    try {
      console.log("r", item);
      let id = item.id;
      await axios.delete(
        `${process.env.REACT_APP_SERVER_HOST}/wishlist_items/${id}`
      );

      dispatch(getWishListState());
    } catch (e) {
      showError(e);
    }
  };
};

export const addOwnedWish = (wishlist_item) => {
  return async function (dispatch, getState) {
    try {
      let state = getState();
      let user_id = get(state, "user.id", null);

      await axios.post(`${process.env.REACT_APP_SERVER_HOST}/owned_wishes`, {
        book_id: get(wishlist_item, "wish_val.book.id", null),
        user_id: user_id,
        wish_id: get(wishlist_item, "id", null),
      });

      dispatch(getWishListState());
    } catch (e) {
      showError(e);
    }
  };
};

export const removeOwnedWish = (wishlist_item) => {
  return async function (dispatch, getState) {
    try {
      // let user_id = get(getState(), "user.id", null);
      let owned_id = get(wishlist_item, "owned_id", null);

      await axios.delete(
        `${process.env.REACT_APP_SERVER_HOST}/owned_wishes/${owned_id}`
      );

      dispatch(getWishListState());
    } catch (e) {
      showError(e);
    }
  };
};

export const getWishListState = () => {
  return async function (dispatch, getState) {
    try {
      let user_id = get(getState(), "user.id", null);

      console.log('user_id', user_id)

      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOST}/wishlists`,
        {
          params: {
            user_id,
          },
        }
      );

      const { updated_at, id: wishlist_id, items } = response.data;

      dispatch({
        type: "setWishListState",
        payload: {
          items: items,
          id: wishlist_id,
          updatedAt: updated_at,
        },
      });
    } catch (e) {
      showError(e);
    }
  };
};
