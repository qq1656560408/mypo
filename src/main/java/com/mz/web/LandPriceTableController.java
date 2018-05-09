package com.mz.web;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import com.mz.entity.LandPriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.service.ILandPriceTableService;
import com.mz.util.LayuiResponseData;
import com.mz.vo.ShowLandPrice;
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
@RequestMapping("/landPriceTable")
public class LandPriceTableController extends BaseControl {

	@Autowired
	ILandPriceTableService landPriceTableService;

	@RequestMapping("excelImprot")
	@ResponseBody
	public Object excelImprot(MultipartFile excelFile) {
		return landPriceTableService.insertExcelImport(excelFile);
	}

	@RequestMapping("selectPriceTable")
	@ResponseBody
	public Object selectPriceTable(Integer page, Integer limit) {
		if (page == null) {
			page = 1;
		}
		if (limit == null) {
			limit = 10;
		}
		int begin = (page - 1) * limit;
		int count = landPriceTableService.selectCount(null);
		List<ShowLandPrice> list = landPriceTableService.selectPriceTableLimit(begin, limit);
		return new LayuiResponseData(count, list);
	}

	@RequestMapping("bingInsertBaseData")
	public ModelAndView insertBaseData() {
		return loadBase("DataManage/langManage/jiaGe/insertLangPrice");
	}

	@RequestMapping("bingUpdateBaseData")
	public ModelAndView updateBaseData(int id) {
		ShowLandPrice swp = landPriceTableService.selectByID(id);
		ModelAndView modelAndView = loadBase("DataManage/langManage/jiaGe/updateLangPrice");
		modelAndView.addObject("swp", swp);
		return modelAndView;
	}

	@RequestMapping("insertPrice")
	@ResponseBody
	public Object insertPrice(Integer year,WaterTypeandFeaturesTable water,LandPriceTable mpt) {
		int yearID = initBaseData.getValueKey("year").get(year);
		water.setYearID(yearID);
		int i = landPriceTableService.insertPriceTable(water,mpt);
		return isSuccess(i);
	}

	@RequestMapping("updatePrice")
	@ResponseBody
	public Object updatePrice(LandPriceTable mpt) {
		Boolean b = landPriceTableService.updatePrice(mpt);
		return "{\"success\":" + b + "}";

	}

	@RequestMapping("deletePrice")
	@ResponseBody
	public Object deletePrice(int id) {
		Boolean b = landPriceTableService.deleteByID(id);
		return "{\"success\":" + b + "}";
	}
}
