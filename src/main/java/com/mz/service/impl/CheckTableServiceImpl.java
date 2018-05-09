package com.mz.service.impl;

import com.mz.entity.CheckProveMaterialTable;
import com.mz.entity.CheckTable;
import com.mz.mapper.CheckProveMaterialTableMapper;
import com.mz.mapper.CheckTableMapper;
import com.mz.mapper.UserTableMapper;
import com.mz.service.ICheckTableService;
import com.mz.vo.InsertCheckUnitMaterial;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author
 * @since 2018-04-16
 */
@Service
public class CheckTableServiceImpl extends ServiceImpl<CheckTableMapper, CheckTable> implements ICheckTableService {
	@Autowired
	private CheckTableMapper checkTableMapper;
	@Autowired
	private CheckProveMaterialTableMapper checkProveMaterialTableMapper;
	@Autowired
	private UserTableMapper userTableMapper;
	
    //UserSession.getUserID();//获取用户id
	
	/**
	 * 新增申请考核信息、考核证明资料
	 */
	@Override
	public int insertCheckTable(List<InsertCheckUnitMaterial> arr) {
		CheckTable checkTable;
		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		String CheckTime = df.format(date);
		int N = 0;
		for (int i = 0; i < arr.size(); i++) {
			checkTable = new CheckTable();
			checkTable.setCheckDemand(arr.get(i).checkDemand);
			checkTable.setProjectMC(arr.get(i).projectMC);
			checkTable.setApplicant(userTableMapper.selectUserNameBYuserID(1));// session
			checkTable.setAuditNo(0);
			checkTable.setRemarks("");
			checkTable.setCheckTime(CheckTime);
			int id = 0;
			int M = checkTableMapper.insertCheckTable(checkTable);
			if (M != 0) {
				N = 1;
				id = checkTable.getCheckID();
			} else {
				N = 0;
			}
			if (id != 0) {
				if (arr.get(i).list.size() != 0) {
					CheckProveMaterialTable checkProveMaterialTable;
					for (int k = 0; k < arr.get(i).list.size(); k++) {
						checkProveMaterialTable = new CheckProveMaterialTable();
						checkProveMaterialTable.setCheckID(id);
						checkProveMaterialTable.setProveMaterialURL(arr.get(i).list.get(k));
						checkProveMaterialTable.setOriginalMame(arr.get(i).list_original.get(k));
						int K = checkProveMaterialTableMapper.insert(checkProveMaterialTable);
						if (K == 0) {
							N = 0;
						} else {
							N = 1;
						}
					}
				}
			}
		}
		return N;
	}

	/**
	 * 分页查询待考核信息(没用)
	 */
	@Override
	public List<com.mz.vo.selectWaitExamine> selectWaitExamine(Integer page, Integer num, Integer auditNo) {
		List<com.mz.vo.selectWaitExamine> list = checkTableMapper.selectWaitExamine((page - 1) * num, num, auditNo);
		return list;
	}

	/**
	 * 根据单位id和时间，查询待考核明细信息(没用)
	 */
	@Override
	public List<com.mz.vo.selectWaitExamine> selectWaitExamineDetail(String checkID) {
		List<com.mz.vo.selectWaitExamine> list = new ArrayList<>();
		String[] ID = checkID.split(",");
		for (int i = 0; i < ID.length; i++) {
			list.add(checkTableMapper.selectWaitExamineDetail(Integer.valueOf(ID[i])));
		}
		return list;
	}

	/**
	 * 审核待考核信息
	 */
	@Override
	public int updateWaitExamineDetail(String strIdAScore) {
		int k = 0;
		try {
			CheckTable checkTable;
			Date date = new Date();
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss:SSS");
			String CheckTime = df.format(date);
			String[] sourceStrArray = strIdAScore.split(";");
			for (int s = 0; s < sourceStrArray.length; s++) {
				String[] IdAScore = sourceStrArray[s].split(",");
				checkTable = new CheckTable();
				checkTable.setAuditor(userTableMapper.selectUserNameBYuserID(1));// session
				checkTable.setCheckID(Integer.valueOf(IdAScore[0]));
				checkTable.setReviewScore(Double.valueOf(IdAScore[1]));
				checkTable.setReviewTime(CheckTime);
				k = checkTableMapper.updateWaitExamineDetail(checkTable);
			}
		} catch (Exception e) {
			k = 0;
		} finally {

		}
		return k;
	}

	/**
	 * 查询数量(没用)
	 */
	@Override
	public int selectWaitExamineNUM(Integer auditNo) {
		return checkTableMapper.selectWaitExamineNUM(auditNo);
	}

	/**
	 * 按照分数段来查询一审核指标信息
	 */
	@Override
	public List<com.mz.vo.selectWaitExamine> selectWaitExamineBYScore(Integer page, Integer num, Integer low,
			Integer tall) {
		return checkTableMapper.selectWaitExamineBYScore((page - 1) * num, num, low, tall);
	}

	/**
	 * 查询个人记录信息
	 */
	@Override
	public List<CheckTable> selectPersonalRecord(Integer auditNo1, Integer auditNo2, int page, int num) {
		String applicant = userTableMapper.selectUserNameBYuserID(1);// session
		return checkTableMapper.selectPersonalRecord(applicant, auditNo1, auditNo2, (page - 1) * num, num);
	}

	/**
	 * 查询个人记录信息数量
	 */
	@Override
	public int selectPersonalRecordNUM(Integer auditNo1, Integer auditNo2) {
		String applicant = userTableMapper.selectUserNameBYuserID(1);// session
		return checkTableMapper.selectPersonalRecordNUM(applicant, auditNo1, auditNo2);
	}

	/**
	 * 查询提交的申请信息（group by申请时间去重）
	 */
	@Override
	public List<com.mz.vo.selectApplication> selectApplication(int page, int num) {
		List<com.mz.vo.selectApplication> list = checkTableMapper.selectApplication((page - 1) * num, num);
		for (int i = 0; i < list.size(); i++) {
			List<com.mz.vo.selectApplication> list_JD = checkTableMapper
					.selectJDBycheckTime(list.get(i).getCheckTime());
			list.get(i).setZ_sum(list_JD.get(0).getZ_sum());
			list.get(i).setAuditingNum(list_JD.get(0).getAuditingNum());
		}
		return list;
	}

	/**
	 * 查询提交的申请信息次数
	 */
	@Override
	public int selectApplicationNUM() {
		return checkTableMapper.selectApplicationNUM();
	}

	
	/**
     * 查询指标项目（全部）（根据id获取时间，在根据时间获取全部）
	 */
	@Override
	public List<com.mz.vo.selectApplication> selectApplicationDetail(Integer checkID) {
		return checkTableMapper.selectApplicationDetail(checkID);
	}
}
