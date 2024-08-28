import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'amplifyTeamDrive',
        access: (allow) => ({
            'profile-pictures/{entity_id}/*': [ // thư mục riêng user cho hình ảnh
                allow.guest.to(['read']),
                allow.entity('identity').to(['read', 'write', 'delete'])
            ],
            'picture-product/*': [ // hình ảnh sản phầm
                allow.guest.to(['read']),
                allow.groups(['Admin', 'SecAdmin']).to(['read', 'write', 'delete'])
            ],
        })
});