package com.mz.service;

import com.mz.entity.CheckTable;
import com.mz.vo.InsertCheckUnitMaterial;
import com.mz.vo.selectApplication;
import com.mz.vo.selectWaitExamine;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
public interface ICheckTableService extends IService<CheckTable> {
	/**
	 * 新增考核指标
	 * @param checkUnitMaterialTemTable
	 * @return
	 */
	int insertCheckTable(List<InsertCheckUnitMaterial> arr);
	
	/**
	 * 查询考核指标信息
	 * @param 
	 * @return
	 */
    List<selectWaitExamine> selectWaitExamine(Integer page,Integer num,Integer auditNo);
    /**
     *  按照分数段来查询一审核指标信息
     * @param page
     * @param num
     * @param low
     * @param tall
     * @return
     */
    List<selectWaitExamine> selectWaitExamineBYScore(Integer page,Integer num,Integer low,Integer tall);
    /**
	 * 查询考核指标信息明细
	 * @param checkID
	 * @return
	 */
    List<selectWaitExamine> selectWaitExamineDetail(String checkID);
    /**
     * 审核单位审核
     * @param checkTable
     * @return
     */
    int updateWaitExamineDetail(String strIdAScore);
    /**
     * 查询指标总数
     * @return
     */
    int selectWaitExamineNUM(Integer auditNo);
    
    /**
     * 查询个人信息
     * @param applicant
     * @param auditNo1
     * @param auditNo2
     * @param page
     * @param num
     * @return
     */
    List<CheckTable> selectPersonalRecord(Integer auditNo1,Integer auditNo2,int page,int num);
    /**
     * 查询个人记录信息数量
     * @param applicant
     * @param auditNo1
     * @param auditNo2
     * @return
     */
    int selectPersonalRecordNUM(Integer auditNo1,Integer auditNo2);
    /**
     * 查询提交的申请信息（group by申请时间去重）
     * @return
     */
    List<selectApplication> selectApplication(int page,int num);
    /**
     *  查询提交的申请信息次数
     */
    int selectApplicationNUM();
    /**
     * 查询指标项目（全部）（根据id获取时间，在根据时间获取全部）
     * @param checkID
     * @return
     */
    List<selectApplication> selectApplicationDetail(Integer checkID);
}
