import addToFavoritesService from "../services/addToFavorites.service.js"

export default (req, res) => {
    const { userId, productId } = req.body

    if (userId && productId) {
        addToFavoritesService(userId, productId, res)
    }
}