package com.mz.mapper;

import com.mz.entity.CheckTable;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.mz.vo.selectApplication;
import com.mz.vo.selectWaitExamine;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
public interface CheckTableMapper extends BaseMapper<CheckTable> {
	/**
	 * 新增考核表返回id
	 * @param checkTable
	 * @return
	 */
	int insertCheckTable(CheckTable checkTable);
	/**
	 * 查询带考核指标信息
	 * @param checkUnitID
	 * @return
	 */
    List<selectWaitExamine> selectWaitExamine(@Param("page")int page,@Param("num")int num,@Param("auditNo")int auditNo);
    /**
     * 按照分数段来查询一审核指标信息
     * @param page
     * @param num
     * @param low
     * @param tall
     * @return
     */
    List<selectWaitExamine> selectWaitExamineBYScore(@Param("page")int page,@Param("num")int num,@Param("low")int low,@Param("tall")int tall);
    /**
	 * 查询带考核指标信息明细
	 * @param checkUnitID
	 * @return
	 */
    selectWaitExamine selectWaitExamineDetail(@Param("checkID")int checkID);
    /**
     * 审核单位审核
     * @param checkTable
     * @return
     */
    int updateWaitExamineDetail(CheckTable checkTable);
    /**
     * 
     * @return
     */
    int selectWaitExamineNUM(@Param("auditNo")int auditNo);
    /**
     * 查询个人信息
     * @param applicant
     * @param auditNo1
     * @param auditNo2
     * @param page
     * @param num
     * @return
     */
    List<CheckTable> selectPersonalRecord(@Param("applicant")String applicant,@Param("auditNo1")Integer auditNo1,@Param("auditNo2")Integer auditNo2,@Param("page")int page,@Param("num")int num);
    /**
     * 查询个人记录信息数量
     * @param applicant
     * @param auditNo1
     * @param auditNo2
     * @return
     */
    int selectPersonalRecordNUM(@Param("applicant")String applicant,@Param("auditNo1")Integer auditNo1,@Param("auditNo2")Integer auditNo2);
    /**
     * 查询提交的申请信息（group by申请时间去重）
     * @return
     */
    List<com.mz.vo.selectApplication> selectApplication(@Param("page")int page,@Param("num")int num);
    /**
     * 查询全部提交的次数
     * @return
     */
    Integer selectApplicationNUM();
    /**
     * 查询审核进度
     * @param checkTime
     * @return
     */
    List<selectApplication> selectJDBycheckTime(@Param("checkTime")String checkTime);
    /**
     * 查询指标项目（全部）（根据id获取时间，在根据时间获取全部）
     */
    List<com.mz.vo.selectApplication> selectApplicationDetail(@Param("checkID")int checkID);
}