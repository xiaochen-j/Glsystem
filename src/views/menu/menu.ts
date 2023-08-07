
//自己用的接口我直接写在了自己那个模块下了 没统一放在api下
import service from '@/network/request'

export function useMenuNavApi() {
	return service.get('/data/menu/nav.json')
}

export const useAuthorityListApi = () => {
	return service.get('/data/menu/authority.json')
}

export const useMenuListApi = () => {
	return service.get('/data/menu/list.json')
}

export const useMenuApi = (id: Number) => {
	return service.get('/data/menu/1.json')
}
