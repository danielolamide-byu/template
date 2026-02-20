
const pool = require("../database")
async function addDreamCar(dream_make, dream_model, dream_year, dream_description, dream_image, dream_thumbnail, dream_price, dream_miles, dream_color) {
    try {
        const info = "INSERT INTO public.dreamvehicle(dream_make, dream_model, dream_year, dream_description, dream_image, dream_thumbnail, dream_price, dream_miles, dream_color) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *"
        return await pool.query(info, [dream_make, dream_model, dream_year, dream_description, dream_image, dream_thumbnail, dream_price, dream_miles, dream_color])
    } catch (error) {
        console.log("Error in The Database", error);
    }
};

module.exports = { addDreamCar };