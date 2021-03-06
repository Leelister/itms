package com.lister.itms.dao.entity;

public class ProductUserDO {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column sys_product_user.id
     *
     * @mbggenerated
     */
    private Long id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column sys_product_user.user_id
     *
     * @mbggenerated
     */
    private Long userId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column sys_product_user.product_id
     *
     * @mbggenerated
     */
    private Long productId;

    public ProductUserDO() {
    }

    public ProductUserDO(Long userId, Long productId) {
        this.userId = userId;
        this.productId = productId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column sys_product_user.id
     *
     * @return the value of sys_product_user.id
     *
     * @mbggenerated
     */
    public Long getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column sys_product_user.id
     *
     * @param id the value for sys_product_user.id
     *
     * @mbggenerated
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column sys_product_user.user_id
     *
     * @return the value of sys_product_user.user_id
     *
     * @mbggenerated
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column sys_product_user.user_id
     *
     * @param userId the value for sys_product_user.user_id
     *
     * @mbggenerated
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column sys_product_user.product_id
     *
     * @return the value of sys_product_user.product_id
     *
     * @mbggenerated
     */
    public Long getProductId() {
        return productId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column sys_product_user.product_id
     *
     * @param productId the value for sys_product_user.product_id
     *
     * @mbggenerated
     */
    public void setProductId(Long productId) {
        this.productId = productId == null ? null : productId;
    }
}
