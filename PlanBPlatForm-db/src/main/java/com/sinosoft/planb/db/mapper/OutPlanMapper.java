package com.sinosoft.planb.db.mapper;

import com.sinosoft.planb.db.entity.OutPlan;
import com.sinosoft.planb.db.entity.OutPlanExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface OutPlanMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table outplan
     *
     * @mbggenerated Tue May 30 13:30:43 CST 2017
     */
    int countByExample(OutPlanExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table outplan
     *
     * @mbggenerated Tue May 30 13:30:43 CST 2017
     */
    int deleteByExample(OutPlanExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table outplan
     *
     * @mbggenerated Tue May 30 13:30:43 CST 2017
     */
    int deleteByPrimaryKey(Integer serialNo);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table outplan
     *
     * @mbggenerated Tue May 30 13:30:43 CST 2017
     */
    int insert(OutPlan record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table outplan
     *
     * @mbggenerated Tue May 30 13:30:43 CST 2017
     */
    int insertSelective(OutPlan record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table outplan
     *
     * @mbggenerated Tue May 30 13:30:43 CST 2017
     */
    List<OutPlan> selectByExample(OutPlanExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table outplan
     *
     * @mbggenerated Tue May 30 13:30:43 CST 2017
     */
    OutPlan selectByPrimaryKey(Integer serialNo);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table outplan
     *
     * @mbggenerated Tue May 30 13:30:43 CST 2017
     */
    int updateByExampleSelective(@Param("record") OutPlan record, @Param("example") OutPlanExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table outplan
     *
     * @mbggenerated Tue May 30 13:30:43 CST 2017
     */
    int updateByExample(@Param("record") OutPlan record, @Param("example") OutPlanExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table outplan
     *
     * @mbggenerated Tue May 30 13:30:43 CST 2017
     */
    int updateByPrimaryKeySelective(OutPlan record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table outplan
     *
     * @mbggenerated Tue May 30 13:30:43 CST 2017
     */
    int updateByPrimaryKey(OutPlan record);
}