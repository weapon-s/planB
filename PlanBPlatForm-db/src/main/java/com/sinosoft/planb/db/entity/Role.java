package com.sinosoft.planb.db.entity;

public class Role {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column role.rolecode
     *
     * @mbggenerated Thu May 25 19:32:37 CST 2017
     */
    private Integer roleCode;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column role.rolename
     *
     * @mbggenerated Thu May 25 19:32:37 CST 2017
     */
    private String roleName;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column role.note
     *
     * @mbggenerated Thu May 25 19:32:37 CST 2017
     */
    private String note;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column role.rolecode
     *
     * @return the value of role.rolecode
     *
     * @mbggenerated Thu May 25 19:32:37 CST 2017
     */
    public Integer getRoleCode() {
        return roleCode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column role.rolecode
     *
     * @param roleCode the value for role.rolecode
     *
     * @mbggenerated Thu May 25 19:32:37 CST 2017
     */
    public void setRoleCode(Integer roleCode) {
        this.roleCode = roleCode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column role.rolename
     *
     * @return the value of role.rolename
     *
     * @mbggenerated Thu May 25 19:32:37 CST 2017
     */
    public String getRoleName() {
        return roleName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column role.rolename
     *
     * @param roleName the value for role.rolename
     *
     * @mbggenerated Thu May 25 19:32:37 CST 2017
     */
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column role.note
     *
     * @return the value of role.note
     *
     * @mbggenerated Thu May 25 19:32:37 CST 2017
     */
    public String getNote() {
        return note;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column role.note
     *
     * @param note the value for role.note
     *
     * @mbggenerated Thu May 25 19:32:37 CST 2017
     */
    public void setNote(String note) {
        this.note = note;
    }
}