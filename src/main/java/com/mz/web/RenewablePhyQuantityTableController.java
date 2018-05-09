package com.mz.web;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import com.mz.entity.RenewablePhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.service.IRenewablePhyQuantityTableService;
import com.mz.util.LayuiResponseData;
import com.mz.vo.ShowRenewablePhyQuantity;
import com.mz.web.base.BaseControl;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 
 * @since 2018-04-21
 */
@Controller
@RequestMapping("/renewablePhyQuantityTable")
public class RenewablePhyQuantityTableController extends BaseControl{

	@Autowired
	IRenewablePhyQuantityTableService renewablePhyQuantityTableService;

	/**
	 * excel导入
	 * 
	 * @param excelFile
	 * @return
	 */
	@RequestMapping("excelImprot")
	@ResponseBody
	public Object excelImprot(MultipartFile excelFile) {
		return renewablePhyQuantityTableService.insertExcelImport(excelFile);
	}

	/**
	 * 查询数据
	 * 
	 * @param page
	 * @param limit
	 * @return
	 */
	@RequestMapping("selectPhyQuantity")
	@ResponseBody
	public Object selectPhyQuantity(Integer page, Integer limit) {
		if (page == null) {
			page = 1;
		}
		if (limit == null) {
			limit = 10;
		}
		int begin = (page - 1) * limit;

		int count = renewablePhyQuantityTableService.selectCount(null);
		List<ShowRenewablePhyQuantity> list = renewablePhyQuantityTableService.selectPhyQuantityLimit(begin, limit);
		return new LayuiResponseData(count, list);
	}

	/**
	 * 绑定新增页面下拉框
	 * 
	 * @return
	 */
	@RequestMapping("bingInsertBaseData")
	public ModelAndView insertBaseData() {
		return loadBase("DataManage/RenewableManage/shiWuLiang/insertRenewable");
	}

	/**
	 * 绑定修改页面下拉框
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("bingUpdateBaseData")
	public ModelAndView updateBaseData(int id) {
		ShowRenewablePhyQuantity spq = renewablePhyQuantityTableService.selectByID(id);
		ModelAndView modelAndView = loadBase("DataManage/RenewableManage/shiWuLiang/updateRenewable");
		modelAndView.addObject("spq", spq);
		return modelAndView;
	}

	/**
	 * 新增实物量
	 * 
	 * @param year
	 * @param water
	 * @param renewable
	 * @return
	 */
	@RequestMapping("insertPhyQuantity")
	@ResponseBody
	public Object insertPhyQuantity(Integer year, WaterTypeandFeaturesTable water,
			RenewablePhyQuantityTable renewable) {
		int yearID = initBaseData.getValueKey("year").get(year);
		water.setYearID(yearID);
		int i = renewablePhyQuantityTableService.insertPhyQuantity(water, renewable);
		return isSuccess(i);
	}

	/**
	 * 修改实物量
	 * 
	 * @param year
	 * @param water
	 * @param renewable
	 * @return
	 */
	@RequestMapping("updatePhyQuantity")
	@ResponseBody
	public Object updatePhyQuantity(RenewablePhyQuantityTable renewable) {
		int i = renewablePhyQuantityTableService.updatePhyQuantity(renewable);
		return isSuccess(i);
	}

	/**
	 * 删除实物量
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("deletePhyQuantity")
	@ResponseBody
	public Object deletePhyQuantity(int id) {
		int i = renewablePhyQuantityTableService.deleteByID(id);
		return isSuccess(i);
	}
}
