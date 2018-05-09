package com.mz.web;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import com.mz.entity.AtmospherePhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.service.IAtmospherePhyQuantityTableService;
import com.mz.util.LayuiResponseData;
import com.mz.vo.ShowAtmoshpherePhyQuantity;
import com.mz.web.base.BaseControl;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author
 * @since 2018-04-21
 */
@Controller
@RequestMapping("/atmospherePhyQuantityTable")
public class AtmospherePhyQuantityTableController extends BaseControl {

	@Autowired
	IAtmospherePhyQuantityTableService atmospherePhyQuantityTableService;

	/**
	 * excel导入
	 * 
	 * @param excelFile
	 * @return
	 */
	@RequestMapping("excelImprot")
	@ResponseBody
	public Object excelImprot(MultipartFile excelFile) {
		return atmospherePhyQuantityTableService.insertExcelImport(excelFile);
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

		int count = atmospherePhyQuantityTableService.selectCount(null);
		List<ShowAtmoshpherePhyQuantity> list = atmospherePhyQuantityTableService.selectPhyQuantityLimit(begin, limit);
		return new LayuiResponseData(count, list);
	}

	/**
	 * 绑定新增页面下拉框
	 * 
	 * @return
	 */
	@RequestMapping("bingInsertBaseData")
	public ModelAndView insertBaseData() {
		return loadBase("DataManage/atmosphereManage/shiWuLiang/insertAtmosphere");
	}

	/**
	 * 绑定修改页面下拉框
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("bingUpdateBaseData")
	public ModelAndView updateBaseData(int id) {
		ShowAtmoshpherePhyQuantity spq = atmospherePhyQuantityTableService.selectByID(id);
		ModelAndView modelAndView = loadBase("DataManage/atmosphereManage/shiWuLiang/updateAtmosphere");
		modelAndView.addObject("spq", spq);
		return modelAndView;
	}

	/**
	 * 新增实物量
	 * 
	 * @param year
	 * @param water
	 * @param atmosphere
	 * @return
	 */
	@RequestMapping("insertPhyQuantity")
	@ResponseBody
	public Object insertPhyQuantity(Integer year, WaterTypeandFeaturesTable water,
			AtmospherePhyQuantityTable atmosphere) {
		int yearID = initBaseData.getValueKey("year").get(year);
		water.setYearID(yearID);
		int i = atmospherePhyQuantityTableService.insertPhyQuantity(water, atmosphere);
		return isSuccess(i);
	}

	/**
	 * 修改实物量
	 * 
	 * @param year
	 * @param water
	 * @param atmosphere
	 * @return
	 */
	@RequestMapping("updatePhyQuantity")
	@ResponseBody
	public Object updatePhyQuantity(AtmospherePhyQuantityTable atmosphere) {
		int i = atmospherePhyQuantityTableService.updatePhyQuantity(atmosphere);
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
		int i = atmospherePhyQuantityTableService.deleteByID(id);
		return isSuccess(i);
	}
}
