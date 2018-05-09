package com.mz.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import com.mz.entity.LandPhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.service.ILandPhyQuantityTableService;
import com.mz.util.LayuiResponseData;
import com.mz.vo.ShowLangPhyQuantity;
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
@RequestMapping("/landPhyQuantityTable")
public class LandPhyQuantityTableController extends BaseControl{
	
	@Autowired
	ILandPhyQuantityTableService landPhyQuantityTableService;

	/**
	 * excel导入
	 * 
	 * @param excelFile
	 * @return
	 */
	@RequestMapping("excelImprot")
	@ResponseBody
	public Object excelImprot(MultipartFile excelFile) {
		return landPhyQuantityTableService.insertExcelImport(excelFile);
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

		int count = landPhyQuantityTableService.selectCount(null);
		List<ShowLangPhyQuantity> list = landPhyQuantityTableService.selectPhyQuantityLimit(begin, limit);
		return new LayuiResponseData(count, list);
	}

	/**
	 * 绑定新增页面下拉框
	 * 
	 * @return
	 */
	@RequestMapping("bingInsertBaseData")
	public ModelAndView insertBaseData() {
		return loadBase("DataManage/langManage/shiWuLiang/insertLang");
	}

	/**
	 * 绑定修改页面下拉框
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("bingUpdateBaseData")
	public ModelAndView updateBaseData(int id) {
		ShowLangPhyQuantity spq = landPhyQuantityTableService.selectByID(id);
		ModelAndView modelAndView = loadBase("DataManage/langManage/shiWuLiang/updateLang");
		modelAndView.addObject("spq", spq);
		return modelAndView;
	}

	/**
	 * 新增实物量
	 * 
	 * @param year
	 * @param water
	 * @param lang
	 * @return
	 */
	@RequestMapping("insertPhyQuantity")
	@ResponseBody
	public Object insertPhyQuantity(Integer year, WaterTypeandFeaturesTable water, LandPhyQuantityTable lang) {
		try {
			int yearID = initBaseData.getValueKey("year").get(year);
			water.setYearID(yearID);
			boolean b = landPhyQuantityTableService.insertPhyQuantity(water, lang);
			return "{\"success\":" + b + "}";
		} catch (Exception e) {
			e.printStackTrace();
			return "{\"success\":false}";
		}
	}

	/**
	 * 修改实物量
	 * 
	 * @param year
	 * @param water
	 * @param lang
	 * @return
	 */
	@RequestMapping("updatePhyQuantity")
	@ResponseBody
	public Object updatePhyQuantity(LandPhyQuantityTable lang) {
		boolean ok = landPhyQuantityTableService.updatePhyQuantity(lang);
		return "{\"success\":" + ok + "}";
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
		try {
			landPhyQuantityTableService.deleteByID(id);
			return "{\"success\":true}";
		} catch (Exception e) {
			e.printStackTrace();
			return "{\"success\":false}";
		}
	}
}
