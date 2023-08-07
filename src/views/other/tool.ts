// // 把路径转换成驼峰命名
// export const pathToCamel = (path: string): string => {
// 	return path.replace(/\/(\w)/g, (all, letter) => letter.toUpperCase())
// }

// // 获取svg图标(id)列表
// export const getIconList = (): string[] => {
// 	const rs: string[] = []
// 	const list = document.querySelectorAll('svg symbol')
// 	for (let i = 0; i < list.length; i++) {
// 		rs.push(list[i].id)
// 	}
// 	return rs
// }


// 把路径转换成驼峰命名
export function pathToCamel(path: string): string {
	return path.replace(/\/(\w)/g, (all, letter) => letter.toUpperCase());
}

// 获取SVG图标(ID)列表
export function getIconList(): string[] {
	const rs: string[] = [];
	const list = Array.from(document.querySelectorAll('svg symbol'));
	for (let i = 0; i < list.length; i++) {
		rs.push(list[i].id);
	}
	return rs;
}