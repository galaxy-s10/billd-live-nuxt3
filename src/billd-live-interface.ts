import { LiveRoomTypeEnum } from './enum';
import { ISequelizeTimestamps, IUser } from './interface';

export interface IArea extends ISequelizeTimestamps {
  id?: number;
  name?: string;
  remark?: string;
  /** 权重 */
  weight?: number;
  area_live_rooms?: IAreaLiveRoom[];
}

export interface IAreaLiveRoom extends ISequelizeTimestamps {
  id?: number;
  area_id?: number;
  live_room_id?: number;
  /** 分区信息 */
  area?: IUser;
  /** 直播间信息 */
  live_room?: ILiveRoom;
}

export interface ILive extends ISequelizeTimestamps {
  id?: number;
  /** 用户信息 */
  user?: IUser;
  /** 直播间信息 */
  live_room?: ILiveRoom;
  socket_id?: string;
  user_id?: number;
  live_room_id?: number;
  /** 1开启;2关闭 */
  track_video?: number;
  /** 1开启;2关闭 */
  track_audio?: number;
}

export interface IUserLiveRoom extends ISequelizeTimestamps {
  id?: number;
  user_id?: number;
  live_room_id?: number;
  /** 用户信息 */
  user?: IUser;
  /** 直播间信息 */
  live_room?: ILiveRoom;
}

export interface ILiveRoom extends ISequelizeTimestamps {
  id?: number;
  /** 用户信息 */
  user?: IUser;
  /** 用户信息 */
  users?: IUser[];
  /** 分区信息 */
  area?: IArea;
  /** 直播信息 */
  live?: ILive;
  user_live_room?: IUserLiveRoom & { user: IUser };
  name?: string;
  /** 1:使用cdn;2:不使用cdn */
  cdn?: number;
  /** 权重 */
  weight?: number;
  key?: string;
  type?: LiveRoomTypeEnum;
  cover_img?: string;
  rtmp_url?: string;
  flv_url?: string;
  hls_url?: string;
}
