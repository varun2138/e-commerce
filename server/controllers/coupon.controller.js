import Coupon from "../models/coupon.model.js";

const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });
    res.json(coupon || null);
    console.log("coupon", coupon);
  } catch (error) {
    console.log("Error in getCoupon Controller", error.message);
    res.status(500).json({ message: "server error", error: error.message });
  }
};
const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({
      code: code,
      userId: req.user._id,
      isActive: true,
    });
    if (!coupon) {
      return res.status(404).json({ message: "coupon not found" });
    }
    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      res.status(404).json({ message: "coupon code expred" });
    }

    res.json({
      message: "coupon is valid",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
    console.log("code", coupon.code);
  } catch (error) {
    console.log("Error in validateCoupon Controller", error.message);
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export { getCoupon, validateCoupon };
